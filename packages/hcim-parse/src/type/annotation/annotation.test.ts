import { faker } from '$test';
import { expect, test } from 'vitest';
import { reference } from '../reference/reference.js';
import * as general from './annotation.js';

test('annotation', () => {
    const data = faker.fhir.annotation();
    const { time, text, authorReference } = data;
    const expected = {
        _type: 'annotation',
        time,
        text,
        author: reference(authorReference),
    };
    expect(general.annotation(data)).toEqual(expected);
});
