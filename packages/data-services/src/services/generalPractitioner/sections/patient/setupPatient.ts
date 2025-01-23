import { type FhirClient, type FhirVersion } from '@minvws/mgo-fhir-client';
import { partialRequest } from '../../../../utils/partialRequest/partialRequest';

export function setupPatient<V extends FhirVersion>({ getResources }: FhirClient<V>) {
    return {
        getPatient: partialRequest(
            getResources,
            {
                resource: 'Patient',
            } as const,
            {
                searchParams: {
                    _include: 'Patient:general-practitioner',
                },
            }
        ),
    };
}
