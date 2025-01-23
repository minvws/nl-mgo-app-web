import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir-data';

export function getEncounterData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        hospitalAdmissions: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://nictiz.nl/fhir/StructureDefinition/zib-Encounter',
            organizationIdFilter
        ),
        appointments: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://nictiz.nl/fhir/StructureDefinition/eAfspraak-Appointment',
            organizationIdFilter
        ),
        encounters: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://nictiz.nl/fhir/StructureDefinition/gp-Encounter',
            organizationIdFilter
        ),
        journalEntries: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://nictiz.nl/fhir/StructureDefinition/gp-JournalEntry',
            organizationIdFilter
        ),
        compositions: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://nictiz.nl/fhir/StructureDefinition/gp-EncounterReport',
            organizationIdFilter
        ),
    };
}
