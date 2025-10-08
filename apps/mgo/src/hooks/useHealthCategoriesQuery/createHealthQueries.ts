import { getDataServiceConfig } from '$/config';
import { HealthcareOrganization } from '$/store';
import { type DataServiceConfig } from '@minvws/mgo-config';
import { FhirVersion } from '@minvws/mgo-fhir';
import { hasIntersection } from '../../../../../packages/utils/src/hasIntersection/hasIntersection';
import { createHealthQuery } from './createHealthQuery';

export interface HealthCategoryQueryArgs {
    organizations: HealthcareOrganization[];
    profiles: string[];
}

function findRelevantEndpoints(
    dataServiceConfig: DataServiceConfig | undefined,
    profiles: string[]
) {
    return dataServiceConfig?.endpoints.filter((endpoint) =>
        hasIntersection(endpoint.profiles, profiles)
    );
}

export function createHealthQueries({ profiles, organizations }: HealthCategoryQueryArgs) {
    const createHealthQueries = (
        organization: HealthcareOrganization,
        dataService: {
            id: string;
            resourceEndpoint: string;
            fhirVersion: string;
            fhirVersionEnum: FhirVersion;
        },
        endpoints: DataServiceConfig['endpoints']
    ) => {
        return endpoints.map((endpoint) =>
            createHealthQuery({
                organizationId: organization.id,
                dataServiceId: dataService.id,
                resourceEndpoint: dataService.resourceEndpoint,
                endpointId: endpoint.id,
            })
        );
    };

    const queryConfigs = [];

    for (const organization of organizations) {
        for (const dataService of organization.dataServices) {
            const dataServiceConfig = getDataServiceConfig(dataService.id);
            const relevantEndpoints = findRelevantEndpoints(dataServiceConfig, profiles);

            if (!dataServiceConfig || !relevantEndpoints) {
                continue;
            }

            const dataServiceDetails = {
                ...dataService,
                fhirVersion: dataServiceConfig.fhirVersion,
                fhirVersionEnum: dataServiceConfig.fhirVersionEnum as FhirVersion,
            };

            queryConfigs.push(
                ...createHealthQueries(organization, dataServiceDetails, relevantEndpoints)
            );
        }
    }

    return queryConfigs;
}
