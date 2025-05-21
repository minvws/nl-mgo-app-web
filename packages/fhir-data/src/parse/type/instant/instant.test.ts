import { faker } from '$test';
import { expect, test } from 'vitest';
import { instant } from './instant';

test('instant', () => {
    const value = faker.fhir.dateTime();
    expect(instant(value)).toEqual({
        _type: 'instant',
        value,
    });
});
