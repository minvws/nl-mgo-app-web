import { type ResourcesState } from '$/store';

export function getProblemData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        problems: resources.getResourcesByProfile(
            'http://nictiz.nl/fhir/StructureDefinition/zib-Problem',
            organizationIdFilter
        ),
    };
}
