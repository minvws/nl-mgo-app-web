import { expect } from 'vitest';
import { type UiSchema } from '../src/ui';
import { deepReplaceUndefined } from '../src/utils';
import { testUiSchemaContext } from './uiSchemaContext';

export { faker } from './faker';
export { testSet } from './testSet';

export function expectJson(value: unknown) {
    // replace undefined with null so it shows up in the json snapshot
    const json = JSON.stringify(deepReplaceUndefined(value), null, 4);
    return expect(json);
}

export function expectUiSchemaJson(uiSchema: UiSchema) {
    const { setEmptyEntries } = testUiSchemaContext({
        ignoreMissingTranslations: true,
    });
    // normally the `getUiSchema` replaces the empty entries.
    // to get a more realistic snapshot we also do that in this helper.
    return expectJson(setEmptyEntries(uiSchema));
}

export { testUiSchemaContext } from './uiSchemaContext';
