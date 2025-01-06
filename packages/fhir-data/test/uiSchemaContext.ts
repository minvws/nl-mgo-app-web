import { type FhirVersion, type MgoResourceR3, type MgoResourceR4 } from '../src';
import { Locale, type IntlOptions } from '../src/i18n';
import { type FhirR3R4 } from '../src/types/Fhir';
import { createUiSchemaContext } from '../src/ui';
import { type UiSchemaContext } from '../src/ui/context/context';
import { getUi } from '../src/ui/context/ui';
import { setEmptyEntries } from '../src/ui/helpers';
import { i18nContext } from './faker/i18nContext';

export interface TestUiSchemaOptions<T extends `${FhirVersion}`> extends IntlOptions {
    useMock: boolean;
    resources?: FhirR3R4<T, MgoResourceR3[], MgoResourceR4[]>;
}

export function testUiSchemaContext<T extends `${FhirVersion}` = `${FhirVersion.R3}`>(
    options: Partial<TestUiSchemaOptions<T>> = {}
): UiSchemaContext<T> {
    if (options.useMock) {
        const mockUiContext = i18nContext();
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
