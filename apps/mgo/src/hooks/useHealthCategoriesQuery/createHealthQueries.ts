import { HealthcareOrganization } from '$/store';
import { HealthCategoryConfig } from '@minvws/mgo-config';
import { getRelevantEndpoints } from '../../config';
import { createHealthQuery } from './createHealthQuery';

export interface HealthCategoryQueryArgs {
    organizations: HealthcareOrganization[];
    categories: HealthCategoryConfig[];
}

export function createHealthQueries({ categories, organizations }: HealthCategoryQueryArgs) {
    const relevantEndpoints = getRelevantEndpoints(categories);
    const queryConfigs = [];

    for (const organization of organizations) {
        for (const dataService of organization.dataServices) {
            const endpointIds = relevantEndpoints
                .filter((x) => x.dataServiceId === dataService.id)
                .map((x) => x.endpointId);

            if (!endpointIds.length) {
                continue;
            }

            queryConfigs.push(
                ...endpointIds.map((endpointId) =>
                    createHealthQuery({
                        organizationId: organization.id,
                        dataServiceId: dataService.id,
                        resourceEndpoint: dataService.resourceEndpoint,
                        endpointId,
                    })
                )
            );
        }
    }

    return queryConfigs;
}
