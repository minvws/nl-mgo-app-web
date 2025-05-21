import { HealthCategory } from '$/healthCategory/HealthCategory';
import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir-data';
import { type SubCategoryData } from '.';

export function getVaccinationData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        vaccinations: {
            label: `health_category.${HealthCategory.Vaccinations}.vaccinations`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-Vaccination', // NOSONAR
                organizationIdFilter
            ),
        },
        vaccinationEvents: {
            label: `health_category.${HealthCategory.Vaccinations}.vaccination_events`,
            data: resources.getResourcesByProfile(
                FhirVersion.R4,
                'http://nictiz.nl/fhir/StructureDefinition/nl-core-Vaccination-event', // NOSONAR
                organizationIdFilter
            ),
        },
        vaccinationRecommendations: {
            label: `health_category.${HealthCategory.Vaccinations}.vaccination_recommendations`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-VaccinationRecommendation', // NOSONAR
                organizationIdFilter
            ),
        },
    } satisfies Record<string, SubCategoryData>;
}
