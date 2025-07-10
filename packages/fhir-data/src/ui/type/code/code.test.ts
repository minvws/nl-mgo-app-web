import { faker } from '$test';
import { testMessage } from '@minvws/mgo-intl/test';
import { expect, test, vi } from 'vitest';
import { type MgoCode } from '../../../parse/type';
import { code } from './code';

test('code single', () => {
    const label = faker.custom.fhirMessageId();
    const value: MgoCode = {
        _type: 'code',
        value: faker.fhir.code(),
    };
    const context = faker.custom.uiHelperContext();
    const result = code(context)(label, value);

    expect(result).toEqual({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: value.value,
    });
});

test('code multiple', () => {
    const label = faker.custom.fhirMessageId();
    const value: MgoCode[] = [
        {
            _type: 'code',
            value: faker.fhir.code(),
        },
        {
            _type: 'code',
            value: faker.fhir.code(),
        },
        {
            _type: 'code',
            value: faker.fhir.code(),
        },
    ];
    const context = faker.custom.uiHelperContext();
    const result = code(context)(label, value);

    expect(result).toEqual({
        label: testMessage(label),
        type: 'MULTIPLE_VALUES',
        display: value.map((x) => x.value),
    });
});

test('code translates the code when options are used', () => {
    const label = faker.custom.fhirMessageId();
    const value: MgoCode = {
        _type: 'code',
        value: faker.fhir.code(),
    };
    const context = faker.custom.uiHelperContext();
    vi.spyOn(context, 'hasMessage').mockReturnValueOnce(true);
    const i18nCode = faker.lorem.word();
    const result = code(context)(label, value, { i18nCode: i18nCode as any }); // eslint-disable-line @typescript-eslint/no-explicit-any

    expect(result).toEqual({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: `intl(codes.${i18nCode}.${value.value})`,
    });
});

test('code defaults to value if no translation is found and options are used', () => {
    const label = faker.custom.fhirMessageId();
    const value: MgoCode = {
        _type: 'code',
        value: faker.fhir.code(),
    };
    const context = faker.custom.uiHelperContext();
    vi.spyOn(context, 'hasMessage').mockReturnValueOnce(false);
    const i18nCode = faker.lorem.word();
    const result = code(context)(label, value, { i18nCode: i18nCode as any }); // eslint-disable-line @typescript-eslint/no-explicit-any

    expect(result).toEqual({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: value.value,
    });
});

test('code returns undefined if undefined even when options are used', () => {
    const label = faker.custom.fhirMessageId();
    const context = faker.custom.uiHelperContext();
    vi.spyOn(context, 'hasMessage').mockReturnValueOnce(false);
    const i18nCode = faker.lorem.word();
    const result = code(context)(label, undefined, { i18nCode: i18nCode as any }); // eslint-disable-line @typescript-eslint/no-explicit-any

    expect(result).toEqual({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: undefined,
    });
});
