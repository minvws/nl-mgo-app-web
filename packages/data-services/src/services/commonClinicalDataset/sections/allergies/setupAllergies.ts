import { type FhirClient, type FhirVersion } from '@minvws/mgo-fhir-client';
import { partialRequest } from '../../../../utils/partialRequest/partialRequest';

export function setupAllergies<V extends FhirVersion>({ getResources }: FhirClient<V>) {
    return {
        getAllergies: partialRequest(getResources, {
            resource: 'AllergyIntolerance',
        } as const),
    };
}
