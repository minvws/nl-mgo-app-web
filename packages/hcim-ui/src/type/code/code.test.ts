import { faker } from '$test';
import { type MgoCode } from '@minvws/mgo-hcim-parse';
import { testMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test, vi } from 'vitest';
import { MultipleValues, SingleValue } from '../../types/schema.js';
import { code } from './code.js';

test('code single', () => {
    const label = faker.custom.fhirMessageId();
    const value: MgoCode = {
        _type: 'code',
        value: faker.fhir.code(),
    };
    const context = faker.ui.context();
    const result = code(context)(label, value);

    expect(result).toEqual<SingleValue>({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        value: { display: value.value },
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
    const context = faker.ui.context();
    const result = code(context)(label, value);

    expect(result).toEqual<MultipleValues>({
        label: testMessage(label),
        type: 'MULTIPLE_VALUES',
        value: value.map((x) => ({ display: x.value })),
    });
});

test('code translates the code when options are used', () => {
    const label = faker.custom.fhirMessageId();
    const value: MgoCode = {
        _type: 'code',
        value: faker.fhir.code(),
    };
    const context = faker.ui.context();
    vi.spyOn(context, 'hasMessage').mockReturnValueOnce(true);
    const i18nCode = faker.lorem.word();
    const result = code(context)(label, value, { i18nCode: i18nCode as any }); // eslint-disable-line @typescript-eslint/no-explicit-any

    expect(result).toEqual<SingleValue>({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        value: { display: `intl(codes.${i18nCode}.${value.value})` },
    });
});

test('code defaults to value if no translation is found and options are used', () => {
    const label = faker.custom.fhirMessageId();
    const value: MgoCode = {
        _type: 'code',
        value: faker.fhir.code(),
    };
    const context = faker.ui.context();
    vi.spyOn(context, 'hasMessage').mockReturnValueOnce(false);
    const i18nCode = faker.lorem.word();
    const result = code(context)(label, value, { i18nCode: i18nCode as any }); // eslint-disable-line @typescript-eslint/no-explicit-any

    expect(result).toEqual<SingleValue>({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        value: { display: value.value },
    });
});

test('code returns undefined if undefined even when options are used', () => {
    const label = faker.custom.fhirMessageId();
    const context = faker.ui.context();
    vi.spyOn(context, 'hasMessage').mockReturnValueOnce(false);
    const i18nCode = faker.lorem.word();
    const result = code(context)(label, undefined, { i18nCode: i18nCode as any }); // eslint-disable-line @typescript-eslint/no-explicit-any

    expect(result).toEqual<SingleValue>({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        value: undefined,
    });
});
