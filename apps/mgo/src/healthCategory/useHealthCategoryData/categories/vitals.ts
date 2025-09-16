import { HealthCategory } from '$/healthCategory/HealthCategory';
import { type StoreState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir';
import { type SubCategoryData } from '.';

export function getVitalsData(
    getResourcesByProfile: StoreState['getResourcesByProfile'],
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        bloodPressure: {
            label: `health_category.${HealthCategory.Vitals}.blood_pressure`,
            data: getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-BloodPressure', // NOSONAR
                organizationIdFilter
            ),
        },
        bodyWeight: {
            label: `health_category.${HealthCategory.Vitals}.body_weight`,
            data: getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-BodyWeight', // NOSONAR
                organizationIdFilter
            ),
        },
        bodyHeight: {
            label: `health_category.${HealthCategory.Vitals}.body_height`,
            data: getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-BodyHeight', // NOSONAR
                organizationIdFilter
            ),
        },
    } satisfies Record<string, SubCategoryData>;
}
