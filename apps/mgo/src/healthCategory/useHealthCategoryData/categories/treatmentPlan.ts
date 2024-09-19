import { type ResourcesState } from '$/store';

export function getTreatmentPlanData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        getTreatmentDirectives: resources.getResourcesByProfile(
            'http://nictiz.nl/fhir/StructureDefinition/zib-TreatmentDirective',
            organizationIdFilter
        ),
        getAdvanceDirectives: resources.getResourcesByProfile(
            'http://nictiz.nl/fhir/StructureDefinition/zib-AdvancedDirective',
            organizationIdFilter
        ),
    };
}
