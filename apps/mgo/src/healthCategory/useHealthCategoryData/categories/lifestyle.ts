import { type ResourcesState } from '$/store';

export function getLifestyleData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        currentLivingSituation: resources.getResourcesByProfile(
            'http://nictiz.nl/fhir/StructureDefinition/zib-LivingSituation',
            organizationIdFilter
        ),
        drugUse: resources.getResourcesByProfile(
            'http://nictiz.nl/fhir/StructureDefinition/zib-DrugUse',
            organizationIdFilter
        ),
        alchoholuse: resources.getResourcesByProfile(
            'http://nictiz.nl/fhir/StructureDefinition/zib-AlcoholUse',
            organizationIdFilter
        ),
        tabaccoUse: resources.getResourcesByProfile(
            'http://nictiz.nl/fhir/StructureDefinition/zib-TobaccoUse',
            organizationIdFilter
        ),
        nutritionAdvice: resources.getResourcesByProfile(
            'http://nictiz.nl/fhir/StructureDefinition/zib-NutritionAdvice',
            organizationIdFilter
        ),
    };
}
