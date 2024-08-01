import { faker, testSet } from '$test';
import { expect, test } from 'vitest';
import { EMPTY_VALUE } from '../emptyValue';
import * as general from './general';
import { dateTime } from '../primitive/primitive';
import { reference } from '../special/special';
import { collection, setEmptyValues } from '../../helpers';

test.each(Object.entries(general))(
    'returns EMPTY_VALUE for %s if undefined',
    (_name, parsingFunc) => {
        expect(parsingFunc(undefined)).toBe(EMPTY_VALUE);
    }
);

test('codableConcept returns EMPTY_VALUE if no coding data available', () => {
    expect(general.codableConcept({ coding: [] })).toBe(EMPTY_VALUE);
});

testSet(
    'codableConcept',
    () =>
        faker.fhir.codableConcept({
            coding: faker.custom.collection({ min: 1, max: 5, factory: faker.fhir.coding }),
        }),
    (data) => {
        const { coding } = data;
        expect(general.codableConcept(data)).toEqual(collection(coding, general.coding));
    }
);

testSet('coding', faker.fhir.coding, (data) => {
    const { code, display, system } = data;
    expect(general.coding(data)).toEqual(setEmptyValues({ code, display, system }));
});

testSet('identifier', faker.fhir.identifier, (data) => {
    const { use, system, value, type } = data;
    expect(general.identifier(data)).toEqual(
        setEmptyValues({
            use,
            system,
            value,
            type: general.codableConcept(type),
        })
    );
});

testSet('period', faker.fhir.period, (data) => {
    const { start, end } = data;
    expect(general.period(data)).toEqual({
        start: dateTime(start),
        end: dateTime(end),
    });
});

testSet('quantity / duration', faker.fhir.quantity, (data) => {
    const { value, comparator, unit, system, code } = data;
    expect(general.quantity(data)).toEqual(
        setEmptyValues({
            value,
            comparator,
            unit,
            system,
            code,
        })
    );
});

testSet('ratio', faker.fhir.ratio, (data) => {
    const { numerator, denominator } = data;
    expect(general.ratio(data)).toEqual({
        numerator: general.quantity(numerator),
        denominator: general.quantity(denominator),
    });
});

testSet('annotation', faker.fhir.annotation, (data) => {
    const { time, text, authorReference } = data;
    expect(general.annotation(data)).toEqual({
        time: dateTime(time),
        text,
        author: reference(authorReference),
    });
});
