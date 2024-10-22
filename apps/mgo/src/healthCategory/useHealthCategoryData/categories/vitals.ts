import { type ResourcesState } from '$/store';

export function getVitalsData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        bloodPressure: resources.getResourcesByProfile(
            'http://nictiz.nl/fhir/StructureDefinition/zib-BloodPressure',
            organizationIdFilter
        ),
        bodyWeight: resources.getResourcesByProfile(
            'http://nictiz.nl/fhir/StructureDefinition/zib-BodyWeight',
            organizationIdFilter
        ),
        bodyHeight: resources.getResourcesByProfile(
            'http://nictiz.nl/fhir/StructureDefinition/zib-BodyHeight',
            organizationIdFilter
        ),
    };
}
