import { type FhirClient } from '../../../client/createClient/createClient';
import { partialRequest } from '../../../utils/partialRequest/partialRequest';

export function setupMedication({ getResources }: FhirClient) {
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
                resource: 'MedicationStatement',
            } as const,
            {
                searchParams: {
                    category: 'http://snomed.info/sct|16076005',
                    _include: 'MedicationStatement:medication',
                },
            }
        ),

        getAdministrationAgreements: partialRequest(
            getResources,
            {
                resource: 'MedicationStatement',
            } as const,
            {
                searchParams: {
                    category: 'http://snomed.info/sct|422037009',
                    _include: 'MedicationDispense:medication',
                },
            }
        ),
    };
}
