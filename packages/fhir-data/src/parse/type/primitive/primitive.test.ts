import { faker } from '$test';
import { expect, test } from 'vitest';
import * as primitive from './primitive';

test.each(
    [
        [primitive.date, faker.fhir.date()],
        [primitive.dateTime, faker.fhir.dateTime()],
        [primitive.boolean, faker.datatype.boolean()],
        [primitive.code, faker.fhir.code()],
        [primitive.string, faker.lorem.sentences()],
    ].map(([func, value]) => [(func as Function).name, func, value]) // eslint-disable-line @typescript-eslint/ban-types
)('does not transform the data for %s', (_name, func, value) => {
    const parsingFunc = func as (arg: typeof value) => typeof value;
    expect(parsingFunc(value)).toEqual(value);
});
