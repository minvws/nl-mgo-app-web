import { expect } from 'vitest';
import { type HealthUiGroup, type HealthUiSchema } from '../src/ui';
import { setEmptyEntries } from '../src/ui/helpers';
import { testUiSchemaContext } from './uiSchemaContext';

export { faker } from './faker';

export function expectJson(value: unknown) {
    // replace undefined with null so it shows up in the json snapshot
    const json = JSON.stringify(value, (_key, value) => (value === undefined ? null : value), 4);
    return expect(json);
}

export function expectHealthCareUiSchemaJson(
    uiSchema: HealthUiSchema | HealthUiGroup | HealthUiGroup[]
) {
    const context = testUiSchemaContext({
        ignoreMissingTranslations: true,
    });
    // normally the `getDetails` replaces the empty entries.
    // to get a more realistic snapshot we also do that in this helper.
    return expectJson(setEmptyEntries(context)(uiSchema));
}

export { testUiSchemaContext } from './uiSchemaContext';
