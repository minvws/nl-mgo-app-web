import { type FhirClient } from '../../../client/createClient/createClient';
import { partialRequest } from '../../../utils/partialRequest/partialRequest';

export function setupProcedures({ getResources }: FhirClient) {
    return {
        getSurgicalProcedures: partialRequest(
            getResources,
            {
                resource: 'Procedure',
            } as const,
            {
                searchParams: {
                    category: 'http://snomed.info/sct|387713003',
                },
            }
        ),
    };
}
