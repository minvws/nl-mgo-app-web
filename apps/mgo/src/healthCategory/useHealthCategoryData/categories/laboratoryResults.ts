import { type ResourcesState } from '$/store';

export function getLaboratoryResultData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        laboratoryResults: resources.getResourcesByProfile(
            'http://nictiz.nl/fhir/StructureDefinition/zib-LaboratoryTestResult-Observation', // NOSONAR,
            organizationIdFilter
        ),
        diagnosticResults: resources.getResourcesByProfile(
            'http://nictiz.nl/fhir/StructureDefinition/gp-DiagnosticResult', // NOSONAR
            organizationIdFilter
        ),
    };
}
