import { type FhirClient, type FhirVersion } from '@minvws/mgo-fhir-client';
import { partialRequest } from '../../../../utils/partialRequest/partialRequest';

export function setupProblems<V extends FhirVersion>({ getResources }: FhirClient<V>) {
    return {
        getProblems: partialRequest(getResources, {
            resource: 'Condition',
        } as const),
    };
}
