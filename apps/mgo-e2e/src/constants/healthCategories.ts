/**
 * Healthcare categories are configured in the config package.
 * @see packages/config/src/health-categories.json
 */

import { AppMessagesIds } from '@minvws/mgo-intl/test/shared';

/**
 * Extract the category type from the app messages ids.
 * This makes it easier to find a correct category to use.
 * This is based on the heading defined in the health categories json file.
 * @see packages/config/src/health-categories.json
 */
export type HealthCategoryType =
    Extract<AppMessagesIds, `hc_${string}.heading`> extends `hc_${infer R}.heading` ? R : never;

/**
 * Extract the sub category type from the app messages ids.
 * This makes it easier to find a correct sub category to use.
 * This is based on the sub category heading defined in the health categories json file.
 * @see packages/config/src/health-categories.json
 */
export type SubCategoryType =
    Extract<AppMessagesIds, `zib_${string}.heading`> extends `${infer R}.heading`
        ? R
        : Extract<AppMessagesIds, `gp_${string}.heading`> extends `${infer R}.heading`
          ? R
          : never;
