import { HealthCategory } from '$/healthCategory/HealthCategory';
import { type StoreState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir';
import { type SubCategoryData } from '.';

export function getMedicalDevicesData(
    getResourcesByProfile: StoreState['getResourcesByProfile'],
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        medicalDevices: {
            label: `health_category.${HealthCategory.MedicalDevices}.medical_devices`,
            data: getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-MedicalDevice', // NOSONAR
                organizationIdFilter
            ),
        },
        medicalDeviceProducts: {
            label: `health_category.${HealthCategory.MedicalDevices}.medical_device_products`,
            data: getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-MedicalDeviceProduct', // NOSONAR
                organizationIdFilter
            ),
        },
        medicalDeviceRequests: {
            label: `health_category.${HealthCategory.MedicalDevices}.medical_device_requests`,
            data: getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-MedicalDeviceRequest', // NOSONAR
                organizationIdFilter
            ),
        },
    } satisfies Record<string, SubCategoryData>;
}
