import { faker, testSet } from '$test';
import { expect } from 'vitest';
import { dateTime } from '../dateTime/dateTime';
import { reference } from '../reference/reference';
import * as general from './annotation';

testSet('annotation', faker.fhir.annotation, (data) => {
    const { time, text, authorReference } = data;
    const expected = {
        time: dateTime(time),
        text,
        author: reference(authorReference),
    };
    expect(general.annotation(data)).toEqual(expected);
});
