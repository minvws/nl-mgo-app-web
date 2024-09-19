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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            'http://nictiz.nl/fhir/StructureDefinition/zib-AdvancedDirective' as any,
            organizationIdFilter
        ),
    };
}
