import { type HealthcareOrganizationDTO } from '$/services/load/load';
import { DataServiceId } from '@minvws/mgo-data-services';
import { safeGet } from '@minvws/mgo-fhir-data';
import { useIntl } from 'react-intl';

function getResourceEndpoint(organizationDTO: HealthcareOrganizationDTO, id: DataServiceId) {
    return safeGet(organizationDTO, ({ data_services }) => {
        const service = data_services.find((x) => x.id === `${id}`);
        return service!.roles[0].resource_endpoint;
    });
}

const dataServiceIds = [
    DataServiceId.CommonClinicalDataset,
    DataServiceId.GeneralPractitioner,
    DataServiceId.PdfA,
    DataServiceId.VaccinationImmunization,
];

export function useParseHealthcareOrganization() {
    const intl = useIntl();
    const unknownLabel = intl.formatMessage({ id: 'common.unknown' });

    function parseHealthcareOrganization(organizationDTO: HealthcareOrganizationDTO) {
        const { identification, display_name } = organizationDTO;

        return {
            id: identification,
            name: display_name ?? unknownLabel,
            category: safeGet(organizationDTO, (x) => x.types[0].display_name, unknownLabel),
            address: safeGet(organizationDTO, (x) => x.addresses[0].address, unknownLabel),
            resourceEndpoints: dataServiceIds.reduce(
                (acc, id) => ({ ...acc, [id]: getResourceEndpoint(organizationDTO, id) }),
                {}
            ) as Record<DataServiceId, string | undefined>,
        };
    }

    return { parseHealthcareOrganization };
}

export type ParsedHealthcareOrganization = ReturnType<
    ReturnType<typeof useParseHealthcareOrganization>['parseHealthcareOrganization']
>;
