/* c8 ignore start */

/**
 * Load Intl polyfills for Android
 */
import './intlPolyfills/intlPolyfills';

import { createJsonApi } from './createJsonApi/createJsonApi';
import { getMgoResource } from './getMgoResource/getMgoResource';
import { getBundleResources } from './getBundleResources/getBundleResources';
import { getUiSchema } from './getUiSchema/getUiSchema';

export const getBundleResourcesJson = createJsonApi(getBundleResources);
export const getMgoResourceJson = createJsonApi(getMgoResource);
export const getUiSchemaJson = createJsonApi(getUiSchema);
