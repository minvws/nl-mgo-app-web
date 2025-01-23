import { type FhirClient, type FhirVersion } from '@minvws/mgo-fhir-client';
import { partialRequest } from '../../../../utils/partialRequest/partialRequest';

export function setupEncounters<V extends FhirVersion>({ getResources }: FhirClient<V>) {
    return {
        getEncounters: partialRequest(getResources, {
            resource: 'Encounter',
        } as const),
    };
}
