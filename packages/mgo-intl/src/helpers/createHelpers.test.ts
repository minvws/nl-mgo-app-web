import { faker } from '@faker-js/faker';
import { createIntl } from '@formatjs/intl';
import { expect, test } from 'vitest';
import { getIntlConfig } from '../config/base/base';
import { Locale } from '../locale';
import { createHelpers } from './createHelpers';

test('hasMessage return true or false depending on the message exists', () => {
    const intl = createIntl(
        getIntlConfig({
            locale: Locale.NL_NL,
            messages: {
                test: [{ type: 0, value: faker.lorem.word() }],
            },
            ignoreMissingTranslations: true,
        })
    );

    const helpers = createHelpers(intl);

    expect(helpers.hasMessage('test')).toBe(true);
    expect(helpers.hasMessage('foobar')).toBe(false);
});

test('formatMessage returns message by only an id', () => {
    const testMessage = faker.lorem.word();
    const intl = createIntl(
        getIntlConfig({
            locale: Locale.NL_NL,
            messages: {
                test: [{ type: 0, value: testMessage }],
            },
            ignoreMissingTranslations: true,
        })
    );

    const helpers = createHelpers(intl);
    expect(helpers.formatMessage('test')).toBe(testMessage);
});

test('formatMessage takes variables', () => {
    const testMessage = faker.lorem.word();
    const value = faker.lorem.word();
    const intl = createIntl(
        getIntlConfig({
            locale: Locale.NL_NL,
            messages: {
                test: [
                    { type: 0, value: testMessage },
                    { type: 1, value: 'value' },
                ],
            },
            ignoreMissingTranslations: true,
        })
    );

    const helpers = createHelpers(intl);
    expect(helpers.formatMessage('test', { value })).toBe(`${testMessage}${value}`);
});
