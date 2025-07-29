import { setEmptyEntries, type HealthUiGroup, type HealthUiSchema } from '@minvws/mgo-hcim-ui';
import { expect } from 'vitest';
import { testSchemaContext } from './schemaContext.js';

export { faker } from './faker/index.js';

export function expectJson(value: unknown) {
    // replace undefined with null so it shows up in the json snapshot
    const json = JSON.stringify(value, (_key, value) => (value === undefined ? null : value), 4);
    return expect(json);
}

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
