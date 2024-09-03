import { type FhirClient } from '../../../client/createClient/createClient';
import { partialRequest } from '../../../utils/partialRequest/partialRequest';

export function setupPatient({ getResources }: FhirClient) {
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
