import { type FhirClient } from '../../../client/createClient/createClient';
import { partialRequest } from '../../../utils/partialRequest/partialRequest';

export function setupFunctionalStatus({ getResources }: FhirClient) {
    return {
        getLastFunctionalOrMentalStatus: partialRequest(
            getResources,
            {
                resource: 'Observation',
                $lastn: true,
            } as const,
            {
                searchParams: {
                    category: [
                        'http://snomed.info/sct|11291000146105',
                        'http://snomed.info/sct|384821006',
                    ].join(','),
                },
            }
        ),
    };
}
