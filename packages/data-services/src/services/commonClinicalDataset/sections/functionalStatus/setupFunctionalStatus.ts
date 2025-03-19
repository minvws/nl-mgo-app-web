import { type FhirClient, type FhirVersion } from '@minvws/mgo-fhir-client';
import { partialRequest } from '../../../../utils/partialRequest/partialRequest';

export function setupFunctionalStatus<V extends FhirVersion>({ getResources }: FhirClient<V>) {
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
                        'http://snomed.info/sct|118228005', // NOSONAR
                        'http://snomed.info/sct|384821006', // NOSONAR
                    ].join(','),
                },
            }
        ),
    };
}
