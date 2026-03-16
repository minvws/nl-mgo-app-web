/* v8 ignore start */

/**
 * Load Intl polyfills for Android
 */
import '@minvws/mgo-intl/polyfills';

import {
    getBundleResources,
    getCard,
    getDetails,
    getMgoResource,
    getSummary,
} from '@minvws/mgo-hcim';
import { createJsonApi } from '@minvws/mgo-utils';

export const getBundleResourcesJson = createJsonApi(getBundleResources, { lossless: true });
export const getMgoResourceJson = createJsonApi(getMgoResource, { lossless: true });

export const getCardJson = createJsonApi(getCard);
export const getSummaryJson = createJsonApi(getSummary);
export const getDetailsJson = createJsonApi(getDetails);
