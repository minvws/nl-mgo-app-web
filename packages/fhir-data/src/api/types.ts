/* c8 ignore start */

import { type FhirVersion } from '@minvws/mgo-fhir-types';

// Exporting the string values of the FhirVersion enum will look better in the swift / kotlin code
// As they reuse existing similar values in the references.
export type FhirVersionR3 = `${FhirVersion.R3}`;
export type FhirVersionR4 = `${FhirVersion.R4}`;

export * from '../parse/type';
export * from '../ui/types/schema';

export {
    type NlCoreAddress,
    type NlCoreContactpoint,
    type NlCoreHumanname,
    type ZibAdministrationSchedule,
    type ZibInstructionsForUse,
} from '../r3/elements';

export {
    type EAfspraakAppointment,
    type GpDiagnosticResult,
    type GpEncounter,
    type GpEncounterReport,
    type GpJournalEntry,
    type GpLaboratoryResult,
    type IheMhdMinimalDocumentReference,
    type NlCoreEpisodeofcare,
    type NlCoreObservation,
    type NlCoreOrganization,
    type NlCorePatient,
    type NlCorePractitioner,
    type NlCorePractitionerRole,
    type ZibAdministrationAgreement,
    type ZibAdvanceDirective,
    type ZibAlcoholUse,
    type ZibAlert,
    type ZibAllergyIntolerance,
    type ZibBloodPressure,
    type ZibBodyHeight,
    type ZibBodyWeight,
    type ZibDrugUse,
    type ZibEncounter,
    type ZibFunctionalOrMentalStatus,
    type ZibLaboratoryTestResultObservation,
    type ZibLaboratoryTestResultSpecimen,
    type ZibLaboratoryTestResultSpecimenIsolate,
    type ZibLaboratoryTestResultSubstance,
    type ZibLivingSituation,
    type ZibMedicalDevice,
    type ZibMedicalDeviceProduct,
    type ZibMedicalDeviceRequest,
    type ZibMedicationAgreement,
    type ZibMedicationUse,
    type ZibNutritionAdvice,
    type ZibPayer,
    type ZibProblem,
    type ZibProcedure,
    type ZibProcedureRequest,
    type ZibProduct,
    type ZibTobaccoUse,
    type ZibTreatmentDirective,
    type ZibVaccination,
    type ZibVaccinationRecommendation,
} from '../r3/resources';

export {
    type R4NlCoreAddressInformation,
    type R4NlCoreContactInformationEmailAddresses,
    type R4NlCoreContactInformationTelephoneNumbers,
    type R4NlCoreNameInformation,
    type R4NlCoreNameInformationGiven,
} from '../r4/elements';

export {
    type R4NlCoreHealthcareProvider,
    type R4NlCoreHealthcareProviderOrganization,
    type R4NlCoreHealthProfessionalPractitioner,
    type R4NlCoreHealthProfessionalPractitionerRole,
    type R4NlCorePatient,
    type R4NlCorePharmaceuticalProduct,
    type R4NlCoreVaccinationEvent,
} from '../r4/resources';
