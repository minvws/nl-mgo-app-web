import { faker, testSet } from '$test';
import { expect, test } from 'vitest';
import { EMPTY_VALUE, parse } from '../../type';
import * as zibElements from './zib';
import { collection } from '../../helpers';

test.each(Object.entries(zibElements))(
    'returns EMPTY_VALUE for %s if undefined',
    (_name, parsingFunc) => {
        expect(parsingFunc(undefined)).toBe(EMPTY_VALUE);
    }
);

testSet('zibProductIngredient', faker.fhir.medicationIngredient, (data) => {
    const { itemCodeableConcept, amount } = data;
    expect(zibElements.zibProductIngredient(data)).toEqual({
        item: parse.codableConcept(itemCodeableConcept),
        amount: parse.ratio(amount),
    });
});

testSet('zibProductPackage', faker.fhir.medicationPackage, (data) => {
    const { content } = data;
    expect(zibElements.zibProductPackage(data)).toEqual(
        collection(content, ({ itemCodeableConcept, itemReference }) => ({
            item: parse.codableConcept(itemCodeableConcept),
            reference: parse.reference(itemReference),
        }))
    );
});
