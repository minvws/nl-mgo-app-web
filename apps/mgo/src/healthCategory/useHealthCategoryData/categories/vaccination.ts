import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir-data';

export function getVaccinationData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        vaccinations: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://nictiz.nl/fhir/StructureDefinition/zib-Vaccination',
            organizationIdFilter
        ),
        vaccinationEvents: resources.getResourcesByProfile(
            FhirVersion.R4,
            'http://nictiz.nl/fhir/StructureDefinition/nl-core-Vaccination-event', // NOSONAR
            organizationIdFilter
        ),
        vaccinationRecommendations: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://nictiz.nl/fhir/StructureDefinition/zib-VaccinationRecommendation',
            organizationIdFilter
        ),
    };
}
