import {
    ResourcesResponsePromise,
    type FhirClient,
    type FhirVersion,
} from '@minvws/mgo-fhir-client';

type ProceduresService<V extends FhirVersion> = {
    getSurgicalProcedures: () => ResourcesResponsePromise<V, 'Procedure'>;
};

export function setupProcedures<V extends FhirVersion>({
    getResources,
}: FhirClient<V>): ProceduresService<V> {
    return {
        getSurgicalProcedures: () =>
            getResources(
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
