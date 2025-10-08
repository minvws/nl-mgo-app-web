import { isNonNullish, log } from '@minvws/mgo-utils';
import { type HealthcareOrganizationDTO } from './types';

export function parseHealthcareOrganization(organizationDTO: HealthcareOrganizationDTO) {
    const { identification, display_name, data_services = [] } = organizationDTO;

    const dataServices = data_services
        .map((service) => {
            const { id, roles } = service;
            const resourceEndpoint = roles?.[0]?.resource_endpoint;
            if (!id || !resourceEndpoint) {
                log.warn(
                    `Data service for organization: ${display_name} (${identification}) does not contain an id "${id}" or a resource endpoint "${resourceEndpoint}"`
                );
                return null;
            }
            return { id, resourceEndpoint };
        })
        .filter(isNonNullish);

    return {
        id: identification,
        name: display_name,
        category: organizationDTO?.types?.[0]?.display_name,
        address: organizationDTO?.addresses?.[0]?.address,
        dataServices,
    };
}

export type HealthcareOrganizationSearchResult = ReturnType<typeof parseHealthcareOrganization>;
