import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoAnnotation } from '../../../parse/type';
import { annotation } from './annotation';

test('annotation', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const data: MgoAnnotation = {
        time: faker.fhir.dateTime(),
        text: faker.lorem.sentence(),
        author: {
            reference: faker.lorem.sentence(),
            display: faker.lorem.sentence(),
        },
    };
    const result = annotation(label, data, options);
    expect(result).toEqual({
        label,
        type: 'annotation',
        display: data.text,
        ...options,
    });
});
