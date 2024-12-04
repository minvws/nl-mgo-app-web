import { type ResourcesState } from '$/store';

export function getVaccinationData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        vaccinations: resources.getResourcesByProfile(
            'http://nictiz.nl/fhir/StructureDefinition/zib-Vaccination',
            organizationIdFilter
        ),
        vaccinationEvents: resources.getResourcesByProfile(
            'http://nictiz.nl/fhir/StructureDefinition/nl-core-Vaccination-event', // NOSONAR
            organizationIdFilter
        ),
        vaccinationRecommendations: resources.getResourcesByProfile(
            'http://nictiz.nl/fhir/StructureDefinition/zib-VaccinationRecommendation',
            organizationIdFilter
        ),
    };
}
