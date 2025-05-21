/**
 * Configurations for parsing FHIR resources and creating UI schemas.
 * Add new R3 resource configurations here.
 *
 * Notes:
 *   - Make sure you are ONLY exporting `ResourceConfig` objects from this file.
 *   - Don't forget to also export the ResourceType from the `~/api/types` file to make it available for the mobile apps.
 */

export * from './gpDiagnosticResult/gpDiagnosticResult';
export * from './gpEncounter/gpEncounter';
export * from './gpEncounterReport/gpEncounterReport';
export * from './gpJournalEntry/gpJournalEntry';
export * from './gpLaboratoryResult/gpLaboratoryResult';

export * from './nlCoreEpisodeofcare/nlCoreEpisodeofcare';
export * from './nlCoreOrganization/nlCoreOrganization';
export * from './nlCorePatient/nlCorePatient';
export * from './nlCorePractitioner/nlCorePractitioner';
export * from './nlCorePractitionerRole/nlCorePractitionerRole';

export * from './eAfspraakAppointment/eAfspraakAppointment';
export { nlCoreObservation, type NlCoreObservation } from './nlCoreObservation/nlCoreObservation';
export * from './zibAdministrationAgreement/zibAdministrationAgreement';
export * from './zibAdvanceDirective/zibAdvanceDirective';
export * from './zibAlcoholUse/zibAlcoholUse';
export * from './zibAlert/zibAlert';
export * from './zibAllergyIntolerance/zibAllergyIntolerance';
export * from './zibBloodPressure/zibBloodPressure';
export * from './zibBodyHeight/zibBodyHeight';
export * from './zibBodyWeight/zibBodyWeight';
export * from './zibDrugUse/zibDrugUse';
export { zibEncounter, type ZibEncounter } from './zibEncounter/zibEncounter';
export * from './zibFunctionalOrMentalStatus/zibFunctionalOrMentalStatus';
export {
    zibGeneralMeasurement,
    type ZibGeneralMeasurement,
} from './zibGeneralMeasurement/zibGeneralMeasurement';
export {
    zibLaboratoryTestResultObservation,
    type ZibLaboratoryTestResultObservation,
} from './zibLaboratoryTestResultObservation/zibLaboratoryTestResultObservation';
export * from './zibLaboratoryTestResultSpecimen/zibLaboratoryTestResultSpecimen';
export * from './zibLaboratoryTestResultSpecimenIsolate/zibLaboratoryTestResultSpecimenIsolate';
export * from './zibLaboratoryTestResultSubstance/zibLaboratoryTestResultSubstance';
export * from './zibLivingSituation/zibLivingSituation';
export * from './zibMedicalDevice/zibMedicalDevice';
export * from './zibMedicalDeviceProduct/zibMedicalDeviceProduct';
export * from './zibMedicalDeviceRequest/zibMedicalDeviceRequest';
export * from './zibMedicationAgreement/zibMedicationAgreement';
export * from './zibMedicationUse/zibMedicationUse';
export * from './zibNutritionAdvice/zibNutritionAdvice';
export * from './zibPayer/zibPayer';
export * from './zibProblem/zibProblem';
export * from './zibProcedure/zibProcedure';
export * from './zibProcedureRequest/zibProcedureRequest';
export * from './zibProduct/zibProduct';
export * from './zibTobaccoUse/zibTobaccoUse';
export * from './zibTreatmentDirective/zibTreatmentDirective';
export * from './zibVaccination/zibVaccination';
export * from './zibVaccinationRecommendation/zibVaccinationRecommendation';

export * from './iheMhdMinimalDocumentReference/iheMhdMinimalDocumentReference';
