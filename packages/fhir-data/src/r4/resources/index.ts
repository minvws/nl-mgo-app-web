/**
 * Configurations for parsing FHIR resources and creating UI schemas.
 * Add new R4 resource configurations here.
 *
 * Notes:
 *   - Make sure you are ONLY exporting `ResourceConfig` objects from this file.
 *   - Don't forget to also export the ResourceType from the `~/api/types` file to make it available for the mobile apps.
 */

export * from './nlCoreHealthcareProvider/nlCoreHealthcareProvider';
export * from './nlCoreHealthcareProviderOrganization/nlCoreHealthcareProviderOrganization';
export * from './nlCoreHealthProfessionalPractitioner/nlCoreHealthProfessionalPractitioner';
export * from './nlCoreHealthProfessionalPractitionerRole/nlCoreHealthProfessionalPractitionerRole';
export * from './nlCorePatient/nlCorePatient';
export * from './nlCorePharmaceuticalProduct/nlCorePharmaceuticalProduct';
export * from './nlCoreVaccinationEvent/nlCoreVaccinationEvent';
