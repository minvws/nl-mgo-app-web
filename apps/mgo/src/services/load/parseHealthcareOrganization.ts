import { DataServiceId } from '@minvws/mgo-data-services';
import { isNonNullish, log } from '@minvws/mgo-utils';
import { type HealthcareOrganizationDTO } from './types';

export const supportedDataServiceIds = [
    DataServiceId.CommonClinicalDataset,
    DataServiceId.GeneralPractitioner,
    DataServiceId.PdfA,
    DataServiceId.VaccinationImmunization,
];

type SupportedDataServiceId = (typeof supportedDataServiceIds)[number];

export function parseHealthcareOrganization(organizationDTO: HealthcareOrganizationDTO) {
    const { identification, display_name, data_services = [] } = organizationDTO;

    const dataServices = data_services
        .filter((x) => supportedDataServiceIds.includes(x.id as DataServiceId))
        .map((service) => {
            const { id, roles } = service;
            const resourceEndpoint = roles?.[0]?.resource_endpoint;
            if (!resourceEndpoint) {
                log.warn(
                    `Data service for organization: ${display_name} (${identification}) with id "${id}" does not contain a resource endpoint`
                );
                return null;
            }
            return { id: id as SupportedDataServiceId, resourceEndpoint };
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
