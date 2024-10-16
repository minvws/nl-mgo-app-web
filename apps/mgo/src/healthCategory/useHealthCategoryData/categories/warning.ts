import { type ResourcesState } from '$/store';

export function getWarningdata(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        warnings: resources.getResourcesByProfile(
            'http://nictiz.nl/fhir/StructureDefinition/zib-Alert',
            organizationIdFilter
        ),
    };
}
