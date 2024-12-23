import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoAnnotation } from '../../../parse/type';
import { annotation } from './annotation';

test('annotation', () => {
    const label = faker.custom.messageId();
    const options = faker.custom.uiEntryOptions();
    const data: MgoAnnotation = {
        time: faker.fhir.dateTime(),
        text: faker.lorem.sentence(),
        author: {
            reference: faker.lorem.sentence(),
            display: faker.lorem.sentence(),
        },
    };
    const result = annotation(faker.custom.i18nContext())(label, data, options);
    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'SINGLE_VALUE',
        display: data.text,
        ...options,
    });
});
