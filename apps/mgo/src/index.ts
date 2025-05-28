/* c8 ignore start */

/**
 * We only export some values/types from this package that are useful for the E2E tests.
 * This has some limitation as we use a custom `paths` setting in the tsconfig of this package.
 * Anything exported here can NOT have any `paths` references as the mgo-e2e package does not have the same `paths` setting.
 * E.g. `import { ... } from '$/...`
 */

export { HealthCategory } from './healthCategory/HealthCategory';
