import { HealthCategory } from '$/healthCategory/HealthCategory';
import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir-data';
import { type SubCategoryData } from '.';

export function getVitalsData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        bloodPressure: {
            label: `health_category.${HealthCategory.Vitals}.blood_pressure`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-BloodPressure', // NOSONAR
                organizationIdFilter
            ),
        },
        bodyWeight: {
            label: `health_category.${HealthCategory.Vitals}.body_weight`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-BodyWeight', // NOSONAR
                organizationIdFilter
            ),
        },
        bodyHeight: {
            label: `health_category.${HealthCategory.Vitals}.body_height`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-BodyHeight', // NOSONAR
                organizationIdFilter
            ),
        },
    } satisfies Record<string, SubCategoryData>;
}
