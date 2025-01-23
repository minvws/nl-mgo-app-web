import { type FhirClient, type FhirVersion } from '@minvws/mgo-fhir-client';
import { partialRequest } from '../../../../utils/partialRequest/partialRequest';

export function setupProcedures<V extends FhirVersion>({ getResources }: FhirClient<V>) {
    return {
        getSurgicalProcedures: partialRequest(
            getResources,
            {
                resource: 'Procedure',
            } as const,
            {
                searchParams: {
                    category: 'http://snomed.info/sct|387713003', // NOSONAR
                },
            }
        ),
    };
}
