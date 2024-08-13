import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoDateTime, type MgoBoolean, type MgoCode, type MgoDate } from '../../../parse/type';
import { format } from '../../format';
import { toString } from '../../helpers';
import * as primitive from './primitive';

test('date', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const value: MgoDate = faker.fhir.date();
    const result = primitive.date(label, value, options);
    expect(result).toEqual({
        label,
        type: 'date',
        display: format.date(value),
        ...options,
    });
});

test('dateTime', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const value: MgoDateTime = faker.fhir.dateTime();
    const result = primitive.dateTime(label, value, options);
    expect(result).toEqual({
        label,
        type: 'date_time',
        display: format.dateTime(value),
        ...options,
    });
});

test('boolean', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const value: MgoBoolean = faker.datatype.boolean();
    const result = primitive.boolean(label, value, options);
    expect(result).toEqual({
        label,
        type: 'boolean',
        display: toString(value),
        ...options,
    });
});

test('code', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const value: MgoCode = faker.fhir.code();
    const result = primitive.code(label, value, options);
    expect(result).toEqual({
        label,
        type: 'code',
        display: toString(value),
        ...options,
    });
});
