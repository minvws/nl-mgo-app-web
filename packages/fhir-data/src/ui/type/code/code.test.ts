import { faker } from '$test';
import { type MockedFunction, expect, test } from 'vitest';
import { type MgoCode } from '../../../parse/type';
import { code } from './code';
import { type HasMessageHelper } from '../../types';

test('code single', () => {
    const label = faker.custom.messageId();
    const value: MgoCode = faker.fhir.code();
    const context = faker.custom.uiHelperContext();
    const result = code(context)(label, value);

    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'SINGLE_VALUE',
        display: value,
    });
});

test('code multiple', () => {
    const label = faker.custom.messageId();
    const value: MgoCode[] = [faker.fhir.code(), faker.fhir.code(), faker.fhir.code()];
    const context = faker.custom.uiHelperContext();
    const result = code(context)(label, value);

    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'MULTIPLE_VALUES',
        display: value,
    });
});

test('code translates the code when options are used', () => {
    const label = faker.custom.messageId();
    const value: MgoCode = faker.fhir.code();
    const context = faker.custom.uiHelperContext();
    (context.hasMessage as unknown as MockedFunction<HasMessageHelper>).mockImplementation(
        () => true
    );
    const i18nCode = faker.lorem.word();
    const result = code(context)(label, value, { i18nCode: i18nCode as any }); // eslint-disable-line @typescript-eslint/no-explicit-any

    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'SINGLE_VALUE',
        display: `intl(codes.${i18nCode}.${value})`,
    });
});

test('code defaults to value if no translation is found and options are used', () => {
    const label = faker.custom.messageId();
    const value: MgoCode = faker.fhir.code();
    const context = faker.custom.uiHelperContext();
    (context.hasMessage as unknown as MockedFunction<HasMessageHelper>).mockImplementation(
        () => false
    );
    const i18nCode = faker.lorem.word();
    const result = code(context)(label, value, { i18nCode: i18nCode as any }); // eslint-disable-line @typescript-eslint/no-explicit-any

    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'SINGLE_VALUE',
        display: value,
    });
});

test('code returns undefined if undefined even when options are used', () => {
    const label = faker.custom.messageId();
    const context = faker.custom.uiHelperContext();
    (context.hasMessage as unknown as MockedFunction<HasMessageHelper>).mockImplementation(
        () => true
    );
    const i18nCode = faker.lorem.word();
    const result = code(context)(label, undefined, { i18nCode: i18nCode as any }); // eslint-disable-line @typescript-eslint/no-explicit-any

    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'SINGLE_VALUE',
        display: undefined,
    });
});
