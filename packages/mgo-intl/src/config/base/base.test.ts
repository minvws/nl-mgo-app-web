import { faker } from '@faker-js/faker';
import { createIntl as createFormatJsIntl, type MissingTranslationError } from '@formatjs/intl';
import { expect, test, vi } from 'vitest';
import { Locale } from '../../locale';
import { getIntlConfig, type IntlOptions } from './base';

function createIntl(options: IntlOptions<string>) {
    return createFormatJsIntl(getIntlConfig(options));
}

test('the config is set to throw errors if not ignored or handled', () => {
    const intl = createIntl({ locale: Locale.NL_NL });
    expect(() => intl.onError(new Error() as MissingTranslationError)).toThrow();
});

test('does NOT throw if there is a custom error handler set', () => {
    const onError = vi.fn();
    const intl = createIntl({ locale: Locale.NL_NL, onError });
    const error = new Error() as MissingTranslationError;
    expect(() => intl.onError(error)).not.toThrow();
    expect(onError).toHaveBeenCalledWith(error);
});

test('does NOT throw missing translation errors if ignored', () => {
    const intl = createIntl({ locale: Locale.NL_NL, ignoreMissingTranslations: true });
    expect(() =>
        intl.onError(
            new Error('[@formatjs/intl Error MISSING_TRANSLATION]') as MissingTranslationError
        )
    ).not.toThrow();
});

test('does throw other errors than missing translation when missing translation errors are ignored', () => {
    const intl = createIntl({ locale: Locale.NL_NL, ignoreMissingTranslations: true });
    expect(() =>
        intl.onError(new Error(faker.lorem.sentence()) as MissingTranslationError)
    ).toThrow();
});

test('does throw error when missing translations are not ignored', () => {
    const intl = createIntl({ locale: Locale.NL_NL });
    expect(() =>
        intl.onError(
            new Error('[@formatjs/intl Error MISSING_TRANSLATION]') as MissingTranslationError
        )
    ).toThrow();
});
