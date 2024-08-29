import { faker, testSet } from '$test';
import { expect } from 'vitest';
import * as parse from '../../parse/type';
import { map } from '../../utils';
import { zibProductPackage } from './zibProductPackage';

testSet(
    'parses correctly',
    faker.fhir.medicationPackage,
    (data) => {
        const { content } = data;
        expect(zibProductPackage.parse(data)).toEqual({
            content: map(content, ({ itemCodeableConcept, itemReference }) => ({
                item: parse.codeableConcept(itemCodeableConcept),
                reference: parse.reference(itemReference),
            })),
        });
    },
    false
);

testSet(
    'ui schema group is created successfully',
    () => {
        const data = faker.fhir.medicationPackage();
        return zibProductPackage.parse(data);
    },
    (data) => {
        const schema = zibProductPackage.uiSchemaGroup(data);
        expect(schema.label).toBe('zib_product_package.group');
    },
    false
);
