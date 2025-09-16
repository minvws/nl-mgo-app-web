import { HealthCategory } from '$/healthCategory/HealthCategory';
import { type StoreState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir';
import { type SubCategoryData } from '.';

export function getVaccinationData(
    getResourcesByProfile: StoreState['getResourcesByProfile'],
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        vaccinations: {
            label: `health_category.${HealthCategory.Vaccinations}.vaccinations`,
            data: getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-Vaccination', // NOSONAR
                organizationIdFilter
            ),
        },
        vaccinationEvents: {
            label: `health_category.${HealthCategory.Vaccinations}.vaccination_events`,
            data: getResourcesByProfile(
                FhirVersion.R4,
                'http://nictiz.nl/fhir/StructureDefinition/nl-core-Vaccination-event', // NOSONAR
                organizationIdFilter
            ),
        },
        vaccinationRecommendations: {
            label: `health_category.${HealthCategory.Vaccinations}.vaccination_recommendations`,
            data: getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-VaccinationRecommendation', // NOSONAR
                organizationIdFilter
            ),
        },
    } satisfies Record<string, SubCategoryData>;
}
