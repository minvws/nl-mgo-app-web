import { type FhirClient } from '../../../client/createClient/createClient';
import { partialRequest } from '../../../utils/partialRequest/partialRequest';

export function setupResults({ getResources }: FhirClient) {
    return {
        getLastLaboratoryResultsPerType: partialRequest(
            getResources,
            {
                resource: 'Observation',
                $lastn: true,
            } as const,
            {
                searchParams: [
                    ['category', 'http://snomed.info/sct|275711006'],
                    ['_include', 'Observation:related-target'],
                    ['_include', 'Observation:specimen'],
                ],
            }
        ),
    };
}
