import { faker } from '$test';
import { testMessage } from '@minvws/mgo-mgo-intl/test';
import { expect, test } from 'vitest';
import { type MgoAnnotation } from '../../../parse/type';
import { annotation } from './annotation';

test('annotation', () => {
    const label = faker.custom.fhirMessageId();

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
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: data.text,
    });
});
