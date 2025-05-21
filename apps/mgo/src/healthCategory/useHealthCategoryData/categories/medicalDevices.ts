import { HealthCategory } from '$/healthCategory/HealthCategory';
import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir-data';
import { type SubCategoryData } from '.';

export function getMedicalDevicesData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        medicalDevices: {
            label: `health_category.${HealthCategory.MedicalDevices}.medical_devices`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-MedicalDevice', // NOSONAR
                organizationIdFilter
            ),
        },
        medicalDeviceProducts: {
            label: `health_category.${HealthCategory.MedicalDevices}.medical_device_products`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-MedicalDeviceProduct', // NOSONAR
                organizationIdFilter
            ),
        },
        medicalDeviceRequests: {
            label: `health_category.${HealthCategory.MedicalDevices}.medical_device_requests`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-MedicalDeviceRequest', // NOSONAR
                organizationIdFilter
            ),
        },
    } satisfies Record<string, SubCategoryData>;
}
