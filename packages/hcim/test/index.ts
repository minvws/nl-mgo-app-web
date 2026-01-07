import { setEmptyEntries, type HealthUiGroup, type HealthUiSchema } from '@minvws/mgo-hcim-ui';
import { expectJson } from '@minvws/mgo-utils/test/shared';
import { testSchemaContext } from './schemaContext.js';

export { faker } from './faker/index.js';

export { expectJson };

export function expectHealthCareUiSchemaJson(
    uiSchema: HealthUiSchema | HealthUiGroup | HealthUiGroup[]
) {
    const context = testSchemaContext({
        ignoreMissingTranslations: true,
    });
    // normally the `getDetails` replaces the empty entries.
    // to get a more realistic snapshot we also do that in this helper.
    return expectJson(setEmptyEntries(context)(uiSchema));
}

export { testSchemaContext } from './schemaContext.js';
