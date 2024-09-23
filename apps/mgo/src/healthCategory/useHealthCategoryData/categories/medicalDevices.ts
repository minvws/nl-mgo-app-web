import { type ResourcesState } from '$/store';

export function getMedicalDevicesData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        medicalDevices: resources.getResourcesByProfile(
            'http://nictiz.nl/fhir/StructureDefinition/zib-MedicalDevice',
            organizationIdFilter
        ),
    };
}
