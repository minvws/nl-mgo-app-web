import { config } from '$/config';
import { type HealthcareOrganization } from '$/store/organizations/organizations';
import {
    DataServiceId,
    createCommonClinicalDatasetService,
    createGeneralPractitionerService,
    createPdfAService,
    createVaccinationImmunizationService,
} from '@minvws/mgo-data-services';

const dataServiceMap = {
    [DataServiceId.CommonClinicalDataset]: createCommonClinicalDatasetService,
    [DataServiceId.PdfA]: createPdfAService,
    [DataServiceId.GeneralPractitioner]: createGeneralPractitionerService,
    [DataServiceId.VaccinationImmunization]: createVaccinationImmunizationService,
};

export function getDataService<T extends DataServiceId>(
    organization: HealthcareOrganization | undefined,
    dataServiceId: T | undefined
) {
    if (!dataServiceId) {
        return null;
    }

    const createClient = dataServiceMap[dataServiceId];
    const resourceEndpoint = organization?.dataServices.find(
        (x) => x.id === dataServiceId
    )?.resourceEndpoint;

    if (!resourceEndpoint) {
        return null;
    }

    return createClient({
        prefixUrl: `${config.dva_url}/fhir`,
        timeout: 10000,
        headers: {
            'x-mgo-dva-target': resourceEndpoint,
        },
    }) as ReturnType<(typeof dataServiceMap)[T]>;
}
