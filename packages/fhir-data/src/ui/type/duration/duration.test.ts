import { faker } from '$test';
import { testMessage } from '@minvws/mgo-intl/test';
import { expect, test } from 'vitest';
import { format } from '../../format';
import { duration } from './duration';

test('duration', () => {
    const label = faker.custom.fhirMessageId();
    const mgoDuration = faker.mgo.duration();
    const result = duration(faker.custom.uiHelperContext())(label, mgoDuration);
    expect(result).toEqual({
        label: testMessage(label),
        type: `SINGLE_VALUE`,
        display: format.valueWithUnit(mgoDuration.value, mgoDuration.unit),
    });
});
