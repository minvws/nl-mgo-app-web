import { faker, testSet } from '$test';
import { expect, test } from 'vitest';
import { map } from '../../../utils';
import { dateTime } from '../primitive/primitive';
import { reference } from '../special/special';
import * as general from './general';
import { deepReplaceUndefined } from '../../helpers';

test('codeableConcept returns null if no coding data available', () => {
    expect(general.codeableConcept({ coding: [] })).toBe(null);
});

testSet(
    'codeableConcept',
    () =>
        faker.fhir.codeableConcept({
            coding: faker.custom.collection({ min: 1, max: 5, factory: faker.fhir.coding }),
        }),
    (data) => {
        const expected = map(data.coding, general.coding);
        expect(general.codeableConcept(data)).toEqual(expected);
    }
);

testSet('coding', faker.fhir.coding, (data) => {
    const { code, display, system } = data;
    const expected = deepReplaceUndefined({ code, display, system });
    expect(general.coding(data)).toEqual(expected);
});

testSet('identifier', faker.fhir.identifier, (data) => {
    const { use, system, value, type } = data;
    const expected = deepReplaceUndefined({
        use,
        system,
        value,
        type: general.codeableConcept(type),
    });
    expect(general.identifier(data)).toEqual(expected);
});

testSet('period', faker.fhir.period, (data) => {
    const { start, end } = data;
    const expected = {
        start: dateTime(start),
        end: dateTime(end),
    };
    expect(general.period(data)).toEqual(expected);
});

testSet('quantity / duration', faker.fhir.quantity, (data) => {
    const { value, comparator, unit, system, code } = data;
    const expected = deepReplaceUndefined({
        value,
        comparator,
        unit,
        system,
        code,
    });
    expect(general.quantity(data)).toEqual(expected);
});

testSet('ratio', faker.fhir.ratio, (data) => {
    const { numerator, denominator } = data;
    const expected = {
        numerator: general.quantity(numerator),
        denominator: general.quantity(denominator),
    };
    expect(general.ratio(data)).toEqual(expected);
});

testSet('annotation', faker.fhir.annotation, (data) => {
    const { time, text, authorReference } = data;
    const expected = {
        time: dateTime(time),
        text,
        author: reference(authorReference),
    };
    expect(general.annotation(data)).toEqual(expected);
});
