import { type ResourcesState } from '$/store';

export function getProcedureData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        procedures: resources.getResourcesByProfile(
            'http://nictiz.nl/fhir/StructureDefinition/zib-Procedure',
            organizationIdFilter
        ),
        procedureRequests: resources.getResourcesByProfile(
            'http://nictiz.nl/fhir/StructureDefinition/zib-ProcedureRequest',
            organizationIdFilter
        ),
    };
}
