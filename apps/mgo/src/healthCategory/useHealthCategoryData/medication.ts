import { type ResourcesState } from '$/store';

export function getMedicationData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        medicationUse: resources.getResourcesByProfile(
            'http://nictiz.nl/fhir/StructureDefinition/zib-MedicationUse',
            organizationIdFilter
        ),
    };
}
