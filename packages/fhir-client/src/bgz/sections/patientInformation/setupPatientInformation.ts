import { type FhirClient } from '../../../client/createClient/createClient';
import { partialRequest } from '../../../utils/partialRequest/partialRequest';

export function setupPatientInformation({ getResources }: FhirClient) {
    /**
     * Identification,
     * birth date,
     * gender,
     * deceased indicator,
     * contact details,
     * last known marital status,
     * and general practitioner (practitioner or organization)
     */
    const getPatientInformation = partialRequest(
        getResources,
        {
            resource: 'Patient',
        } as const,
        {
            searchParams: {
                _include: 'Patient:general-practitioner',
            },
        }
    );

    return {
        getPatientInformation,

        /** Alias for `getPatientInformation` */
        getGeneralPractitioner: getPatientInformation,

        /** Alias for `getPatientInformation` */
        getFirstRelationOrContact: getPatientInformation,
    };
}
