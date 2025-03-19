import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir-data';
import { type SubCategoryData } from '.';
import { HealthCategory } from '$/healthCategory/HealthCategory';

export function getEncounterData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        hospitalAdmissions: {
            label: `health_category.${HealthCategory.ContactsAndAppointments}.hospital_admissions`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-Encounter',
                organizationIdFilter
            ),
        },
        appointments: {
            label: `health_category.${HealthCategory.ContactsAndAppointments}.appointments`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/eAfspraak-Appointment',
                organizationIdFilter
            ),
        },
        encounters: {
            label: `health_category.${HealthCategory.ContactsAndAppointments}.encounters`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/gp-Encounter',
                organizationIdFilter
            ),
        },
        journalEntries: {
            label: `health_category.${HealthCategory.ContactsAndAppointments}.journal_entries`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/gp-JournalEntry',
                organizationIdFilter
            ),
        },
        compositions: {
            label: `health_category.${HealthCategory.ContactsAndAppointments}.compositions`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/gp-EncounterReport',
                organizationIdFilter
            ),
        },
    } satisfies Record<string, SubCategoryData>;
}
