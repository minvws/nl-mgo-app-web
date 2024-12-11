import { expect } from 'vitest';
import { type UiSchemaContext } from '../src';
import { Locale, type IntlOptions } from '../src/i18n';
import { createUiSchemaContext } from '../src/ui';
import { getUi } from '../src/ui/context/ui';
import { deepReplaceUndefined } from '../src/utils';
import { uiContext } from './faker/uiContext';

export { faker } from './faker';
export { testSet } from './testSet';

export function expectJson(value: unknown) {
    // replace undefined with null so it shows up in the json snapshot
    const json = JSON.stringify(deepReplaceUndefined(value), null, 4);
    return expect(json);
}

type TestUiSchemaOptions = IntlOptions & {
    useMock: boolean;
};

export function testUiSchemaContext(options: Partial<TestUiSchemaOptions> = {}): UiSchemaContext {
    if (options.useMock) {
        const mockUiContext = uiContext();
        return {
            ...mockUiContext,
            ui: getUi(mockUiContext),
        };
    }

    return createUiSchemaContext({
        locale: Locale.NL_NL,
        ignoreMissingTranslations: false,
        ignoreIntlCache: true,
        ...options,
    });
}
