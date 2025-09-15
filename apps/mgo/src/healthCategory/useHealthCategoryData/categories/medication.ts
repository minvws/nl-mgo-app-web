import { HealthCategory } from '$/healthCategory/HealthCategory';
import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir';
import { type SubCategoryData } from '.';

export function getMedicationData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        medicationUse: {
            label: `health_category.${HealthCategory.Medication}.medication_use`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-MedicationUse', // NOSONAR
                organizationIdFilter
            ),
        },
        medicationAgreements: {
            label: `health_category.${HealthCategory.Medication}.medication_agreements`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-MedicationAgreement', // NOSONAR
                organizationIdFilter
            ),
        },
        administrationAgreements: {
            label: `health_category.${HealthCategory.Medication}.administration_agreements`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-AdministrationAgreement', // NOSONAR
                organizationIdFilter
            ),
        },
    } satisfies Record<string, SubCategoryData>;
}
