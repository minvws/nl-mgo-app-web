import { faker } from '$test';
import { expect, test, vi } from 'vitest';
import { type MgoCoding } from '../../../parse/type';
import { coding, codingDisplay } from './coding';

test('coding', () => {
    const label = faker.custom.messageId();
    const options = faker.custom.uiEntryOptions();
    const mgoCoding: MgoCoding = {
        code: faker.fhir.code(),
        system: faker.internet.url(),
        display: faker.lorem.sentence(),
    };
    const result = coding(faker.custom.i18nContext())(label, mgoCoding, options);
    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'SINGLE_VALUE',
        display: `${mgoCoding.display} (intl(format.code_in_system))`,
        ...options,
    });
});

test('coding defaults to empty values', () => {
    const label = faker.custom.messageId();
    const options = faker.custom.uiEntryOptions();
    const result = coding(faker.custom.i18nContext())(label, undefined, options);
    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'SINGLE_VALUE',
        display: undefined,
        ...options,
    });
});

test.each<[MgoCoding, string | undefined]>([
    [{}, undefined],
    [{ code: 'code' }, '(code)'],
    [{ code: 'code', system: 'system' }, '(intl(format.code_in_system - code / system))'],
    [
        { code: 'code', system: 'known-system' },
        '(intl(format.code_in_system - code / intl(system.known-system)))',
    ],
    [
        { display: 'display', code: 'code', system: 'system' },
        'display (intl(format.code_in_system - code / system))',
    ],
    [{ display: 'display', system: 'system' }, 'display'],
])('formats mgo coding for %j', (mgoCoding, expected) => {
    const context = faker.custom.i18nContext();
    vi.spyOn(context, 'hasMessage').mockImplementation((id) => id === 'system.known-system');
    vi.spyOn(context, 'formatMessage').mockImplementation((id, values) => {
        const anyValues = values ?? {};
        if (id === 'format.code_in_system') {
            return `intl(${id} - ${anyValues.code} / ${anyValues.system})`;
        }
        return `intl(${id})`;
    });

    const display = codingDisplay(context);
    expect(display(mgoCoding)).toEqual(expected);
});
