/**
 * Configurations for parsing FHIR resource elements that can be reused across multiple resources.
 *
 * Notes:
 *   - Don't forget to also export the ResourceElementType from the `~/api/types` file to make it available for the mobile apps.
 */

export * from './nlCoreAddress/nlCoreAddress';
export * from './nlCoreContactpoint/nlCoreContactpoint';
export * from './nlCoreHumanname/nlCoreHumanname';
export * from './zibAdministrationSchedule/zibAdministrationSchedule';
export * from './zibInstructionsForUse/zibInstructionsForUse';
