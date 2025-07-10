import { faker } from '$test';
import { testMessage } from '@minvws/mgo-intl/test';
import { expect, test } from 'vitest';
import { type MgoTime } from '../../../parse/type';
import { time } from './time';

test('time single', () => {
    const label = faker.custom.fhirMessageId();

    const value: MgoTime = faker.mgo.time();
    const uiHelperContext = faker.custom.uiHelperContext();
    const result = time(uiHelperContext)(label, value);

    expect(result).toEqual({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: value.value,
    });
});

test('time multiple', () => {
    const label = faker.custom.fhirMessageId();

    const value: MgoTime[] = [faker.mgo.time(), faker.mgo.time(), faker.mgo.time()];
    const uiHelperContext = faker.custom.uiHelperContext();
    const result = time(uiHelperContext)(label, value);

    expect(result).toEqual({
        label: testMessage(label),
        type: 'MULTIPLE_VALUES',
        display: value.map((x) => x.value),
    });
});
