import { HealthCategory } from '$/healthCategory/HealthCategory';
import { type StoreState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir';
import { type SubCategoryData } from '.';

export function getEncounterData(
    getResourcesByProfile: StoreState['getResourcesByProfile'],
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        hospitalAdmissions: {
            label: `health_category.${HealthCategory.ContactsAndAppointments}.hospital_admissions`,
            data: getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-Encounter', // NOSONAR
                organizationIdFilter
            ),
        },
        appointments: {
            label: `health_category.${HealthCategory.ContactsAndAppointments}.appointments`,
            data: getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/eAfspraak-Appointment', // NOSONAR
                organizationIdFilter
            ),
        },
        encounters: {
            label: `health_category.${HealthCategory.ContactsAndAppointments}.encounters`,
            data: getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/gp-Encounter', // NOSONAR
                organizationIdFilter
            ),
        },
        journalEntries: {
            label: `health_category.${HealthCategory.ContactsAndAppointments}.journal_entries`,
            data: getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/gp-JournalEntry', // NOSONAR
                organizationIdFilter
            ),
        },
        compositions: {
            label: `health_category.${HealthCategory.ContactsAndAppointments}.compositions`,
            data: getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/gp-EncounterReport', // NOSONAR
                organizationIdFilter
            ),
        },
    } satisfies Record<string, SubCategoryData>;
}
