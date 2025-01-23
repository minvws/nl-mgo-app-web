import { type FhirClient, type FhirVersion } from '@minvws/mgo-fhir-client';
import { partialRequest } from '../../../../utils/partialRequest/partialRequest';

export function setupPaymentDetails<V extends FhirVersion>({ getResources }: FhirClient<V>) {
    return {
        getInsuranceInformation: partialRequest(
            getResources,
            {
                resource: 'Coverage',
            } as const,
            {
                searchParams: [
                    ['_include', 'Coverage:payor:Patient'],
                    ['_include', 'Coverage:payor:Organization'],
                ],
            }
        ),
    };
}
