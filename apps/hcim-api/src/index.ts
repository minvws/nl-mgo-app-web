/* c8 ignore start */

/**
 * Load Intl polyfills for Android
 */
import '@minvws/mgo-intl/polyfills';

import { getBundleResources, getDetails, getMgoResource, getSummary } from '@minvws/mgo-hcim';
import { createJsonApi } from './createJsonApi/createJsonApi';

export const getBundleResourcesJson = createJsonApi(getBundleResources);
export const getMgoResourceJson = createJsonApi(getMgoResource);

export const getSummaryJson = createJsonApi(getSummary);
export const getDetailsJson = createJsonApi(getDetails);
