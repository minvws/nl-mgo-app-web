/**
 * Configurations for parsing FHIR resources and creating UI schemas.
 * Add new R3 resource configurations here.
 *
 * Note: Make sure you are ONLY exporting `ResourceConfig` objects from this file.
 *
 * @see: https://build.fhir.org/resourcelist.html
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18
 */

export * from './gpLaboratoryResult/gpLaboratoryResult';
export * from './gpDiagnosticResult/gpDiagnosticResult';
export * from './gpEncounter/gpEncounter';
export * from './gpJournalEntry/gpJournalEntry';
export * from './gpEncounterReport/gpEncounterReport';

export * from './nlCorePatient/nlCorePatient';
export * from './nlCoreOrganization/nlCoreOrganization';
export * from './nlCorePractitioner/nlCorePractitioner';
export * from './nlCorePractitionerRole/nlCorePractitionerRole';

export * from './zibAlert/zibAlert';
export * from './zibAdministrationAgreement/zibAdministrationAgreement';
export * from './zibMedicationAgreement/zibMedicationAgreement';
export * from './zibAllergyIntolerance/zibAllergyIntolerance';
export * from './zibMedicationUse/zibMedicationUse';
export * from './zibMedicalDevice/zibMedicalDevice';
export * from './zibPayer/zibPayer';
export * from './zibProblem/zibProblem';
export * from './zibProduct/zibProduct';
export * from './zibTreatmentDirective/zibTreatmentDirective';
export { nlCoreObservation, type NlCoreObservation } from './nlCoreObservation/nlCoreObservation';
export * from './zibLivingSituation/zibLivingSituation';
export * from './zibAlcoholUse/zibAlcoholUse';
export * from './zibDrugUse/zibDrugUse';
export * from './zibFunctionalOrMentalStatus/zibFunctionalOrMentalStatus';
export * from './zibTobaccoUse/zibTobaccoUse';
export * from './zibNutritionAdvice/zibNutritionAdvice';
export * from './zibMedicalDeviceProduct/zibMedicalDeviceProduct';
export * from './zibVaccination/zibVaccination';
export * from './zibEncounter/zibEncounter';
export * from './zibBloodPressure/zibBloodPressure';
export * from './zibBodyWeight/zibBodyWeight';
export * from './zibBodyHeight/zibBodyHeight';
export * from './zibProcedure/zibProcedure';
export * from './zibLaboratoryTestResultObservation/zibLaboratoryTestResultObservation';
export * from './zibLaboratoryTestResultSpecimen/zibLaboratoryTestResultSpecimen';
export * from './zibLaboratoryTestResultSpecimenIsolate/zibLaboratoryTestResultSpecimenIsolate';
export * from './zibLaboratoryTestResultSubstance/zibLaboratoryTestResultSubstance';
export * from './zibAdvanceDirective/zibAdvanceDirective';
export * from './zibProcedureRequest/zibProcedureRequest';
export * from './zibMedicalDeviceRequest/zibMedicalDeviceRequest';
export * from './zibVaccinationRecommendation/zibVaccinationRecommendation';
export * from './eAfspraakAppointment/eAfspraakAppointment';

export * from './iheMhdMinimalDocumentReference/iheMhdMinimalDocumentReference';
