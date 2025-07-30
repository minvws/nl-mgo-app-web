import { faker } from '$test';
import { type MgoTime } from '@minvws/mgo-hcim-parse';
import { testMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test } from 'vitest';
import { time } from './time.js';

test('time single', () => {
    const label = faker.custom.fhirMessageId();

    const value: MgoTime = faker.mgo.time();
    const uiHelperContext = faker.ui.context();
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
    const uiHelperContext = faker.ui.context();
    const result = time(uiHelperContext)(label, value);

    expect(result).toEqual({
        label: testMessage(label),
        type: 'MULTIPLE_VALUES',
        display: value.map((x) => x.value),
    });
});
