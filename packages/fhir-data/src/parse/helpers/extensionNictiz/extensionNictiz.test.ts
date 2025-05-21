import { faker } from '@faker-js/faker';
import { expect, test } from 'vitest';
import { extensionNictiz } from './extensionNictiz';

test('extensionNictiz matches by zibID and returns the value', () => {
    const valueString = faker.string.sample();
    const input = {
        extension: [
            {
                url: 'http://nictiz.nl/fhir/StructureDefinition/zib-NutritionAdvice-Explanation', // NOSONAR
                valueString,
            },
        ],
    };

    const output = extensionNictiz(input, 'zib-NutritionAdvice-Explanation');
    expect(output?.value).toEqual(valueString);
});

test('extensionNictiz also matches modifierExtentions and returns the value', () => {
    const valueString = faker.string.sample();
    const input = {
        resourceType: faker.lorem.word(),
        modifierExtension: [
            {
                url: 'http://nictiz.nl/fhir/StructureDefinition/zib-NutritionAdvice-Explanation', // NOSONAR
                valueString,
            },
        ],
    };

    const output = extensionNictiz(input, 'zib-NutritionAdvice-Explanation');
    expect(output?.value).toEqual(valueString);
});
