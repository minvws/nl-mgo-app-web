import { faker, testSet } from '$test';
import { expect } from 'vitest';
import { parse } from '../../parse/type';
import { map } from '../../utils';
import { zibProductPackage } from './zibProductPackage';

testSet('zibProductPackage', faker.fhir.medicationPackage, (data) => {
    const { content } = data;
    expect(zibProductPackage(data)).toEqual(
        map(content, ({ itemCodeableConcept, itemReference }) => ({
            item: parse.codeableConcept(itemCodeableConcept),
            reference: parse.reference(itemReference),
        }))
    );
});
