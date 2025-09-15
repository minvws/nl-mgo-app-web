/**
 * Configurations for parsing FHIR resource elements that can be reused across multiple resources.
 *
 * Notes:
 *   - Don't forget to also export the ResourceElementType from the `~/api/types` file to make it available for the mobile apps.
 */

export * from './nlCoreAddress/nlCoreAddress.js';
export * from './nlCoreContactpoint/nlCoreContactpoint.js';
export * from './nlCoreHumanname/nlCoreHumanname.js';
export * from './zibAdministrationSchedule/zibAdministrationSchedule.js';
export * from './zibInstructionsForUse/zibInstructionsForUse.js';
