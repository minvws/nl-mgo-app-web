/* c8 ignore start */

/**
 * Load Intl polyfills for Android
 */
import '@minvws/mgo-mgo-intl/polyfills';

import { createJsonApi } from './createJsonApi/createJsonApi';
import { getBundleResources } from './getBundleResources/getBundleResources';
import { getDetails } from './getDetails/getDetails';
import { getMgoResource } from './getMgoResource/getMgoResource';
import { getSummary } from './getSummary/getSummary';

export const getBundleResourcesJson = createJsonApi(getBundleResources);
export const getMgoResourceJson = createJsonApi(getMgoResource);

export const getSummaryJson = createJsonApi(getSummary);
export const getDetailsJson = createJsonApi(getDetails);
