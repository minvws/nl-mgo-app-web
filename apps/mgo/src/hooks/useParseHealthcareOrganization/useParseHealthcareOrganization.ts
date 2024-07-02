import { type HealthcareOrganizationDTO } from '$/api/load';
import { safeGet } from '@minvws/mgo-fhir-data';
import { useIntl } from 'react-intl';

const COMMON_CLINICAL_DATASET_SERVICE_ID = 48;
const GENERAL_PRACTITIONER_SERVICE_ID = 49;
const DOCUMENTS_SERVICE_ID = 51;

function getResourceEndpoint(organizationDTO: HealthcareOrganizationDTO, id: number) {
    return safeGet(organizationDTO, ({ data_services }) => {
        const service = data_services.find((x) => x.id === id);
        return service!.roles[0].resource_endpoint;
    });
}

export function useParseHealthcareOrganization() {
    const intl = useIntl();
    const unknownLabel = intl.formatMessage({ id: 'common.unknown' });

    function parseHealthcareOrganization(organizationDTO: HealthcareOrganizationDTO) {
        const { identification_type, identification_value, display_name } = organizationDTO;

        return {
            id: `${identification_type}-${identification_value}`,
            name: display_name || unknownLabel,
            category: safeGet(organizationDTO, (x) => x.types[0].display_name, unknownLabel),
            address: safeGet(organizationDTO, (x) => x.addresses[0].address, unknownLabel),
            resourceEndpoints: {
                commonClinicalDataset: getResourceEndpoint(
                    organizationDTO,
                    COMMON_CLINICAL_DATASET_SERVICE_ID
                ),
                generalPractitioner: getResourceEndpoint(
                    organizationDTO,
                    GENERAL_PRACTITIONER_SERVICE_ID
                ),
                documents: getResourceEndpoint(organizationDTO, DOCUMENTS_SERVICE_ID),
            },
        };
    }

    return { parseHealthcareOrganization };
}

export type ParsedHealthcareOrganization = ReturnType<
    ReturnType<typeof useParseHealthcareOrganization>['parseHealthcareOrganization']
>;
