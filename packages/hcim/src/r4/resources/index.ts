/**
 * Configurations for parsing FHIR resources and creating UI schemas.
 * Add new R4 resource configurations here.
 *
 * Notes:
 *   - Make sure you are ONLY exporting `ResourceConfig` objects from this file.
 *   - Don't forget to also export the ResourceType from the `~/api/types` file to make it available for the mobile apps.
 */

export * from './nlCoreHealthcareProvider/nlCoreHealthcareProvider.js';
export * from './nlCoreHealthcareProviderOrganization/nlCoreHealthcareProviderOrganization.js';
export * from './nlCoreHealthProfessionalPractitioner/nlCoreHealthProfessionalPractitioner.js';
export * from './nlCoreHealthProfessionalPractitionerRole/nlCoreHealthProfessionalPractitionerRole.js';
export * from './nlCorePatient/nlCorePatient.js';
export * from './nlCorePharmaceuticalProduct/nlCorePharmaceuticalProduct.js';
export * from './nlCoreVaccinationEvent/nlCoreVaccinationEvent.js';
