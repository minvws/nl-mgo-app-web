import { type ResourcesState } from '$/store';

export function getDocumentsData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        documents: resources.getResourcesByProfile(
            'http://nictiz.nl/fhir/StructureDefinition/IHE.MHD.Minimal.DocumentReference',
            organizationIdFilter
        ),
    };
}
