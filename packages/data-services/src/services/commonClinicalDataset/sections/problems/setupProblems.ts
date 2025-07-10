import {
    ResourcesResponsePromise,
    type FhirClient,
    type FhirVersion,
} from '@minvws/mgo-fhir-client';

type ProblemsService<V extends FhirVersion> = {
    getProblems: () => ResourcesResponsePromise<V, 'Condition'>;
};

export function setupProblems<V extends FhirVersion>({
    getResources,
}: FhirClient<V>): ProblemsService<V> {
    return {
        getProblems: () =>
            getResources({
                resource: 'Condition',
            } as const),
    };
}
