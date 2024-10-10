/**
 * Configurations for parsing FHIR resources and creating UI schemas.
 * Add new resource configurations here.
 *
 * Note: Make sure you are ONLY exporting `ResourceConfig` objects from this file.
 *
 * @see: https://build.fhir.org/resourcelist.html
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18
 */

export * from './nlCorePatient/nlCorePatient';

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
