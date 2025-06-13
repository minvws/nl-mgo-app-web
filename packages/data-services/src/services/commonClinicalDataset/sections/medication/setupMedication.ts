import {
    ResourcesResponsePromise,
    type FhirClient,
    type FhirVersion,
} from '@minvws/mgo-fhir-client';

type MedicationService<V extends FhirVersion> = {
    getMedicationUse: () => ResourcesResponsePromise<V, 'MedicationStatement'>;
    getMedicationAgreements: () => ResourcesResponsePromise<V, 'MedicationRequest'>;
    getAdministrationAgreements: () => ResourcesResponsePromise<V, 'MedicationDispense'>;
};

export function setupMedication<V extends FhirVersion>({
    getResources,
}: FhirClient<V>): MedicationService<V> {
    return {
        getMedicationUse: () =>
            getResources(
                {
                    resource: 'MedicationStatement',
                } as const,
                {
                    searchParams: {
                        category: 'urn:oid:2.16.840.1.113883.2.4.3.11.60.20.77.5.3|6',
                        _include: 'MedicationStatement:medication',
                    },
                }
            ),

        getMedicationAgreements: () =>
            getResources(
                {
                    resource: 'MedicationRequest',
                } as const,
                {
                    searchParams: {
                        category: 'http://snomed.info/sct|16076005', // NOSONAR
                        _include: 'MedicationRequest:medication',
                    },
                }
            ),

        getAdministrationAgreements: () =>
            getResources(
                {
                    resource: 'MedicationDispense',
                } as const,
                {
                    searchParams: {
                        category: 'http://snomed.info/sct|422037009', // NOSONAR
                        _include: 'MedicationDispense:medication',
                    },
                }
            ),
    };
}
