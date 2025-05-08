import { faker } from '$test';
import { expect, test } from 'vitest';
import { sampledData } from './sampledData';

test('sampledData', () => {
    const value = faker.fhir.sampledData();
    expect(sampledData(value)).toEqual({
        _type: 'sampledData',
        ...value,
    });
});
