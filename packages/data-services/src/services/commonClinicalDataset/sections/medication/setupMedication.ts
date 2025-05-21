import { type FhirClient, type FhirVersion } from '@minvws/mgo-fhir-client';
import { partialRequest } from '../../../../utils/partialRequest/partialRequest';

export function setupMedication<V extends FhirVersion>({ getResources }: FhirClient<V>) {
    return {
        getMedicationUse: partialRequest(
            getResources,
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

        getMedicationAgreements: partialRequest(
            getResources,
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

        getAdministrationAgreements: partialRequest(
            getResources,
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
