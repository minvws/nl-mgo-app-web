import { type FhirClient, type FhirVersion } from '@minvws/mgo-fhir-client';
import { partialRequest } from '../../../../utils/partialRequest/partialRequest';

export function setupPatientInformation<V extends FhirVersion>({ getResources }: FhirClient<V>) {
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

    return { getPatientInformation };
}
