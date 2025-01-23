import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir-data';

export function getMedicalDevicesData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        medicalDevices: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://nictiz.nl/fhir/StructureDefinition/zib-MedicalDevice',
            organizationIdFilter
        ),
        medicalDeviceProducts: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://nictiz.nl/fhir/StructureDefinition/zib-MedicalDeviceProduct',
            organizationIdFilter
        ),
        medicalDeviceRequests: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://nictiz.nl/fhir/StructureDefinition/zib-MedicalDeviceRequest',
            organizationIdFilter
        ),
    };
}
