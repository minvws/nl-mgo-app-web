import {
    ResourcesResponsePromise,
    type FhirClient,
    type FhirVersion,
} from '@minvws/mgo-fhir-client';

type PaymentDetailsService<V extends FhirVersion> = {
    getInsuranceInformation: () => ResourcesResponsePromise<V, 'Coverage'>;
};

export function setupPaymentDetails<V extends FhirVersion>({
    getResources,
}: FhirClient<V>): PaymentDetailsService<V> {
    return {
        getInsuranceInformation: () =>
            getResources(
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
