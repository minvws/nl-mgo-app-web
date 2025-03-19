import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir-data';
import { type SubCategoryData } from '.';
import { HealthCategory } from '$/healthCategory/HealthCategory';

export function getLifestyleData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        currentLivingSituation: {
            label: `health_category.${HealthCategory.Lifestyle}.current_living_situation`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-LivingSituation',
                organizationIdFilter
            ),
        },
        drugUse: {
            label: `health_category.${HealthCategory.Lifestyle}.drug_use`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-DrugUse',
                organizationIdFilter
            ),
        },
        alchoholuse: {
            label: `health_category.${HealthCategory.Lifestyle}.alchoholuse`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-AlcoholUse',
                organizationIdFilter
            ),
        },
        tabaccoUse: {
            label: `health_category.${HealthCategory.Lifestyle}.tabacco_use`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-TobaccoUse',
                organizationIdFilter
            ),
        },
        nutritionAdvice: {
            label: `health_category.${HealthCategory.Lifestyle}.nutrition_advice`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-NutritionAdvice',
                organizationIdFilter
            ),
        },
    } satisfies Record<string, SubCategoryData>;
}
