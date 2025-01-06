import { expect } from 'vitest';
import { deepReplaceUndefined } from '../src/utils';

export { faker } from './faker';
export { testSet } from './testSet';

export function expectJson(value: unknown) {
    // replace undefined with null so it shows up in the json snapshot
    const json = JSON.stringify(deepReplaceUndefined(value), null, 4);
    return expect(json);
}

export { testUiSchemaContext } from './uiSchemaContext';
