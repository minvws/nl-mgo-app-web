import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir-data';

export function getLifestyleData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        currentLivingSituation: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://nictiz.nl/fhir/StructureDefinition/zib-LivingSituation',
            organizationIdFilter
        ),
        drugUse: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://nictiz.nl/fhir/StructureDefinition/zib-DrugUse',
            organizationIdFilter
        ),
        alchoholuse: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://nictiz.nl/fhir/StructureDefinition/zib-AlcoholUse',
            organizationIdFilter
        ),
        tabaccoUse: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://nictiz.nl/fhir/StructureDefinition/zib-TobaccoUse',
            organizationIdFilter
        ),
        nutritionAdvice: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://nictiz.nl/fhir/StructureDefinition/zib-NutritionAdvice',
            organizationIdFilter
        ),
    };
}
