import { faker } from '@faker-js/faker';
import { expect, test } from 'vitest';
import { extension, extensionNictiz } from './extension';

test('extension matched by url and returns the value', () => {
    const url = faker.internet.url();
    const valueBoolean = faker.datatype.boolean();
    const input = { extension: [{ url, valueBoolean }] };

    const value = extension(input, url, 'boolean');
    expect(value).toBe(valueBoolean);
});

test('extension also matches modifierExtentions and returns the value', () => {
    const url = faker.internet.url();
    const valueBoolean = faker.datatype.boolean();
    const input = {
        resourceType: faker.lorem.word(),
        modifierExtension: [{ url, valueBoolean }],
    };

    const value = extension(input, url, 'boolean');
    expect(value).toBe(valueBoolean);
});

test('zibExtension matches by zibID and returns the value', () => {
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

test('zibExtension also matches modifierExtentions and returns the value', () => {
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
