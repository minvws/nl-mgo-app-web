import { type FhirClient, type FhirVersion } from '@minvws/mgo-fhir-client';
import { partialRequest } from '../../../../utils/partialRequest/partialRequest';

export function setupAlerts<V extends FhirVersion>({ getResources }: FhirClient<V>) {
    return {
        getAlerts: partialRequest(getResources, {
            resource: 'Flag',
        } as const),
    };
}
