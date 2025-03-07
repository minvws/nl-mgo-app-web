import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir-data';

export function getMedicationData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        medicationUse: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://nictiz.nl/fhir/StructureDefinition/zib-MedicationUse', // NOSONAR
            organizationIdFilter
        ),
        medicationAgreements: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://nictiz.nl/fhir/StructureDefinition/zib-MedicationAgreement', // NOSONAR
            organizationIdFilter
        ),
        administrationAgreements: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://nictiz.nl/fhir/StructureDefinition/zib-AdministrationAgreement', // NOSONAR
            organizationIdFilter
        ),
    };
}
