import { type FhirClient, type FhirVersion } from '@minvws/mgo-fhir-client';
import { partialRequest } from '../../../../utils/partialRequest/partialRequest';

export function setupEncounters<V extends FhirVersion>({ getResources }: FhirClient<V>) {
    return {
        getHospitalAdmissions: partialRequest(
            getResources,
            {
                resource: 'Encounter',
            } as const,
            {
                searchParams: {
                    class: [
                        'http://hl7.org/fhir/v3/ActCode|IMP', // NOSONAR
                        'http://hl7.org/fhir/v3/ActCode|ACUTE', // NOSONAR
                        'http://hl7.org/fhir/v3/ActCode|NONAC', // NOSONAR
                    ].join(','),
                },
            }
        ),
    };
}
