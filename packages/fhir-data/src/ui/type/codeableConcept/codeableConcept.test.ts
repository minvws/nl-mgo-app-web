import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoCodeableConcept } from '../../../parse/type';
import { codeableConcept } from './codeableConcept';
import { coding } from '../coding/coding';

test('codeableConcept', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const [concept1, concept2]: MgoCodeableConcept = [
        { code: faker.fhir.code(), system: faker.internet.url(), display: faker.lorem.sentence() },
        { code: faker.fhir.code(), system: faker.internet.url(), display: faker.lorem.sentence() },
    ];
    const result = codeableConcept(label, [concept1, concept2], options);
    expect(result).toEqual({
        label,
        type: 'codable_concept',
        display: [coding('', concept1).display, coding('', concept2).display],
        ...options,
    });
});
