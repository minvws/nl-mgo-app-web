/* c8 ignore start */

export { getBundleResources } from './api/getBundleResources/getBundleResources.js';
export { getDetails } from './api/getDetails/getDetails.js';
export { getMgoResource } from './api/getMgoResource/getMgoResource.js';
export { getSummary } from './api/getSummary/getSummary.js';
export { type MgoResource } from './api/resources/resources.js';

export * from './r3/elements/index.js';
export * from './r3/resources/index.js';
export * from './r4/elements/index.js';
export * from './r4/resources/index.js';
export * from './utils/index.js';

// export the ui schema from this package as well for convenience
export { type HealthUiSchema } from '@minvws/mgo-hcim-ui';
