import { type ResourcesState } from '$/store';

export function getEncounterData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        hospitalAdmissions: resources.getResourcesByProfile(
            'http://nictiz.nl/fhir/StructureDefinition/zib-Encounter',
            organizationIdFilter
        ),
        encounters: resources.getResourcesByProfile(
            'http://nictiz.nl/fhir/StructureDefinition/gp-Encounter',
            organizationIdFilter
        ),
    };
}
