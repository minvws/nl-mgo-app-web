import { faker, testUiSchemaContext } from '$test';
import { expect, test } from 'vitest';
import { parse } from '../../../parse';
import { map } from '../../../utils';
import { zibProductPackage } from './zibProductPackage';

test('parses correctly', () => {
    const data = faker.fhir.medicationPackage();
    const { content } = data;
    expect(zibProductPackage.parse(data)).toEqual({
        content: map(content, ({ itemCodeableConcept, itemReference }) => ({
            item: parse.codeableConcept(itemCodeableConcept),
            reference: parse.reference(itemReference),
        })),
    });
});

test('ui schema group is created successfully', () => {
    const data = zibProductPackage.parse(faker.fhir.medicationPackage());
    const schema = zibProductPackage.uiSchemaGroup(
        data,
        testUiSchemaContext({
            useMock: true,
            ignoreMissingTranslations: true,
        })
    );
    expect(schema.label).toBe('r3.zib_product_package');
});
