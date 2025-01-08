import { type FhirVersion } from '../src';
import { Locale } from '../src/i18n';
import { createUiSchemaContext } from '../src/ui';
import { type UiSchemaContext, type UiSchemaContextOptions } from '../src/ui/context/context';
import { getUi } from '../src/ui/context/ui';
import { setEmptyEntries } from '../src/ui/helpers';
import { uiHelperContext } from './faker/i18nContext';

export interface TestUiSchemaOptions<T extends `${FhirVersion}`> extends UiSchemaContextOptions<T> {
    useMock: boolean;
}

export function testUiSchemaContext<T extends `${FhirVersion}` = `${FhirVersion.R3}`>(
    options: Partial<TestUiSchemaOptions<T>> = {}
): UiSchemaContext<T> {
    if (options.useMock) {
        const mockUiContext = uiHelperContext({
            isSummary: options.isSummary,
        });

        return {
            ...mockUiContext,
            ui: getUi(mockUiContext),
            setEmptyEntries: setEmptyEntries(mockUiContext),
            resources: options.resources ?? [],
        } as UiSchemaContext<T>;
    }

    return createUiSchemaContext<T>({
        locale: Locale.NL_NL,
        ignoreMissingTranslations: false,
        ignoreIntlCache: true,
        ...options,
    });
}
