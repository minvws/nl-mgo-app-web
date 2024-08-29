import { faker } from '@faker-js/faker';
import { expect, test } from 'vitest';
import { extensionNictiz } from './extensionNictiz';

test('extensionNictiz matches by zibID and returns the value', () => {
    const valueBoolean = faker.datatype.boolean();
    const input = {
        extension: [
            {
                url: 'http://nictiz.nl/fhir/StructureDefinition/zib-MedicationUse-AsAgreedIndicator',
                valueBoolean,
            },
        ],
    };

    const value = extensionNictiz(input, 'zib-MedicationUse-AsAgreedIndicator');
    expect(value).toBe(valueBoolean);
});

test('extensionNictiz also matches modifierExtentions and returns the value', () => {
    const valueBoolean = faker.datatype.boolean();
    const input = {
        resourceType: faker.lorem.word(),
        modifierExtension: [
            {
                url: 'http://nictiz.nl/fhir/StructureDefinition/zib-MedicationUse-AsAgreedIndicator',
                valueBoolean,
            },
        ],
    };

    const value = extensionNictiz(input, 'zib-MedicationUse-AsAgreedIndicator');
    expect(value).toBe(valueBoolean);
});
