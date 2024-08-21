import { type FhirClient } from '../../../client/createClient/createClient';
import { partialRequest } from '../../../utils/partialRequest/partialRequest';

export function setupVaccinations({ getResources }: FhirClient) {
    return {
        getVaccinations: partialRequest(
            getResources,
            {
                resource: 'Immunization',
            } as const,
            {
                searchParams: {
                    _include: 'patient,location,performer',
                },
            }
        ),
    };
}
