import { type MgoResourceR3, type MgoResourceR4 } from '../../api/resources/resources';
import { type I18nContext, Locale, createI18nContext, type IntlOptions } from '../../i18n';
import { type FhirR3R4, type FhirVersion } from '../../types/Fhir';
import { setEmptyEntries } from '../helpers';
import { type UiSchema } from '../types';
import { type Ui, getUi } from './ui';

export interface UiSchemaOptions<T extends `${FhirVersion}`> {
    locale?: Locale;
    resources?: FhirR3R4<T, MgoResourceR3[], MgoResourceR4[]>;
}

export type UiSchemaContext<T extends `${FhirVersion}` = FhirVersion> = I18nContext & {
    ui: Ui;
    setEmptyEntries: (schema: UiSchema) => UiSchema;
    resources: FhirR3R4<T, MgoResourceR3[], MgoResourceR4[]>;
};

export function createUiSchemaContext<T extends `${FhirVersion}`>({
    locale,
    ignoreMissingTranslations,
    ignoreIntlCache,
    resources,
}: UiSchemaOptions<T> & Omit<IntlOptions, 'locale'>): UiSchemaContext<T> {
    const i18nContext = createI18nContext({
        locale: locale ?? Locale.NL_NL,
        ignoreMissingTranslations,
        ignoreIntlCache,
    });

    return {
        ...i18nContext,
        ui: getUi(i18nContext),
        setEmptyEntries: setEmptyEntries(i18nContext),
        resources: resources ?? [],
    } as UiSchemaContext<T>;
}
