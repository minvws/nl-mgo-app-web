import { type FhirClient, type FhirVersion } from '@minvws/mgo-fhir-client';
import { partialRequest } from '../../../../utils/partialRequest/partialRequest';

export function setupResults<V extends FhirVersion>({ getResources }: FhirClient<V>) {
    return {
        getLastLaboratoryResultsPerType: partialRequest(
            getResources,
            {
                resource: 'Observation',
                $lastn: true,
            } as const,
            {
                searchParams: [
                    ['category', 'http://snomed.info/sct|275711006'], // NOSONAR
                    ['_include', 'Observation:related-target'],
                    ['_include', 'Observation:specimen'],
                ],
            }
        ),
    };
}
