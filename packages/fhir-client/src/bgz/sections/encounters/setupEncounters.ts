import { type FhirClient } from '../../../client/createClient/createClient';
import { partialRequest } from '../../../utils/partialRequest/partialRequest';

export function setupEncounters({ getResources }: FhirClient) {
    return {
        getHospitalAdmissions: partialRequest(
            getResources,
            {
                resource: 'Encounter',
            } as const,
            {
                searchParams: {
                    class: [
                        'http://hl7.org/fhir/v3/ActCode|IMP',
                        'http://hl7.org/fhir/v3/ActCode|ACUTE',
                        'http://hl7.org/fhir/v3/ActCode|NONAC',
                    ].join(','),
                },
            }
        ),
    };
}
