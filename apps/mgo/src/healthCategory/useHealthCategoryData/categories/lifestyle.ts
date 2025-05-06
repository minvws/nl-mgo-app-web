import { HealthCategory } from '$/healthCategory/HealthCategory';
import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir-data';
import { type SubCategoryData } from '.';

export function getLifestyleData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        currentLivingSituation: {
            label: `health_category.${HealthCategory.Lifestyle}.current_living_situation`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-LivingSituation', // NOSONAR
                organizationIdFilter
            ),
        },
        drugUse: {
            label: `health_category.${HealthCategory.Lifestyle}.drug_use`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-DrugUse', // NOSONAR
                organizationIdFilter
            ),
        },
        alchoholuse: {
            label: `health_category.${HealthCategory.Lifestyle}.alchoholuse`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-AlcoholUse', // NOSONAR
                organizationIdFilter
            ),
        },
        tabaccoUse: {
            label: `health_category.${HealthCategory.Lifestyle}.tabacco_use`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-TobaccoUse', // NOSONAR
                organizationIdFilter
            ),
        },
        nutritionAdvice: {
            label: `health_category.${HealthCategory.Lifestyle}.nutrition_advice`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-NutritionAdvice', // NOSONAR
                organizationIdFilter
            ),
        },
    } satisfies Record<string, SubCategoryData>;
}
