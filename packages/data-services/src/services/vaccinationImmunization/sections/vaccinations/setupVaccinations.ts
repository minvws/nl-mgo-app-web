import { type FhirClient, type FhirVersion } from '@minvws/mgo-fhir-client';
import { partialRequest } from '../../../../utils/partialRequest/partialRequest';

export function setupVaccinations<V extends FhirVersion>({ getResources }: FhirClient<V>) {
    return {
        getVaccinations: partialRequest(getResources, {
            resource: 'Immunization',
        } as const),
    };
}
