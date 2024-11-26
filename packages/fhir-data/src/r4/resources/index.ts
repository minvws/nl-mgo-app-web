/**
 * Configurations for parsing FHIR resources and creating UI schemas.
 * Add new R4 resource configurations here.
 *
 * Note: Make sure you are ONLY exporting `ResourceConfig` objects from this file.
 *
 * @see: https://build.fhir.org/resourcelist.html
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18
 */

export * from './nlCorePatient/nlCorePatient';
export * from './nlCoreHealthProfessionalPractitioner/nlCoreHealthProfessionalPractitioner';
export * from './nlCoreVaccinationEvent/nlCoreVaccinationEvent';
