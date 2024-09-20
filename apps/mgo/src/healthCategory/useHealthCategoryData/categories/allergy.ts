import { type ResourcesState } from '$/store';

export function getAllergyData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        allergies: resources.getResourcesByProfile(
            'http://nictiz.nl/fhir/StructureDefinition/zib-AllergyIntolerance',
            organizationIdFilter
        ),
    };
}
