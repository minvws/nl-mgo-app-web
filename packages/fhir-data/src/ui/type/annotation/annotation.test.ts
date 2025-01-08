import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoAnnotation } from '../../../parse/type';
import { annotation } from './annotation';

test('annotation', () => {
    const label = faker.custom.messageId();

    const data: MgoAnnotation = {
        time: faker.fhir.dateTime(),
        text: faker.lorem.sentence(),
        author: {
            reference: faker.lorem.sentence(),
            display: faker.lorem.sentence(),
        },
    };
    const result = annotation(faker.custom.uiHelperContext())(label, data);
    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'SINGLE_VALUE',
        display: data.text,
    });
});
