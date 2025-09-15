/**
 * Configurations for parsing FHIR resources and creating UI schemas.
 * Add new R3 resource configurations here.
 *
 * Notes:
 *   - Make sure you are ONLY exporting `ResourceConfig` objects from this file.
 *   - Don't forget to also export the ResourceType from the `~/api/types` file to make it available for the mobile apps.
 */

export * from './gpDiagnosticResult/gpDiagnosticResult.js';
export * from './gpEncounter/gpEncounter.js';
export * from './gpEncounterReport/gpEncounterReport.js';
export * from './gpJournalEntry/gpJournalEntry.js';
export * from './gpLaboratoryResult/gpLaboratoryResult.js';

export * from './nlCoreEpisodeofcare/nlCoreEpisodeofcare.js';
export * from './nlCoreOrganization/nlCoreOrganization.js';
export * from './nlCorePatient/nlCorePatient.js';
export * from './nlCorePractitioner/nlCorePractitioner.js';
export * from './nlCorePractitionerRole/nlCorePractitionerRole.js';

export * from './eAfspraakAppointment/eAfspraakAppointment.js';
export {
    nlCoreObservation,
    type NlCoreObservation,
} from './nlCoreObservation/nlCoreObservation.js';
export * from './zibAdministrationAgreement/zibAdministrationAgreement.js';
export * from './zibAdvanceDirective/zibAdvanceDirective.js';
export * from './zibAlcoholUse/zibAlcoholUse.js';
export * from './zibAlert/zibAlert.js';
export * from './zibAllergyIntolerance/zibAllergyIntolerance.js';
export * from './zibBloodPressure/zibBloodPressure.js';
export * from './zibBodyHeight/zibBodyHeight.js';
export * from './zibBodyWeight/zibBodyWeight.js';
export * from './zibDrugUse/zibDrugUse.js';
export { zibEncounter, type ZibEncounter } from './zibEncounter/zibEncounter.js';
export * from './zibFunctionalOrMentalStatus/zibFunctionalOrMentalStatus.js';
export {
    zibGeneralMeasurement,
    type ZibGeneralMeasurement,
} from './zibGeneralMeasurement/zibGeneralMeasurement.js';
export {
    zibLaboratoryTestResultObservation,
    type ZibLaboratoryTestResultObservation,
} from './zibLaboratoryTestResultObservation/zibLaboratoryTestResultObservation.js';
export * from './zibLaboratoryTestResultSpecimen/zibLaboratoryTestResultSpecimen.js';
export * from './zibLaboratoryTestResultSpecimenIsolate/zibLaboratoryTestResultSpecimenIsolate.js';
export * from './zibLaboratoryTestResultSubstance/zibLaboratoryTestResultSubstance.js';
export * from './zibLivingSituation/zibLivingSituation.js';
export * from './zibMedicalDevice/zibMedicalDevice.js';
export * from './zibMedicalDeviceProduct/zibMedicalDeviceProduct.js';
export * from './zibMedicalDeviceRequest/zibMedicalDeviceRequest.js';
export * from './zibMedicationAgreement/zibMedicationAgreement.js';
export * from './zibMedicationUse/zibMedicationUse.js';
export * from './zibNutritionAdvice/zibNutritionAdvice.js';
export * from './zibPayer/zibPayer.js';
export * from './zibProblem/zibProblem.js';
export * from './zibProcedure/zibProcedure.js';
export * from './zibProcedureRequest/zibProcedureRequest.js';
export * from './zibProduct/zibProduct.js';
export * from './zibTobaccoUse/zibTobaccoUse.js';
export * from './zibTreatmentDirective/zibTreatmentDirective.js';
export * from './zibVaccination/zibVaccination.js';
export * from './zibVaccinationRecommendation/zibVaccinationRecommendation.js';

export * from './iheMhdMinimalDocumentReference/iheMhdMinimalDocumentReference.js';
