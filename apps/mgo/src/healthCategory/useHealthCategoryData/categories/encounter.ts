import { type ResourcesState } from '$/store';

export function getEncounterData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        encounters: resources.getResourcesByProfile(
            'http://nictiz.nl/fhir/StructureDefinition/zib-Encounter',
            organizationIdFilter
        ),
    };
}
