import { faker } from '$test';
import { testMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test } from 'vitest';
import { format } from '../../format/index.js';
import { SingleValue } from '../../types/schema.js';
import { duration } from './duration.js';

test('duration', () => {
    const label = faker.custom.fhirMessageId();
    const mgoDuration = faker.mgo.duration();
    const result = duration(faker.ui.context())(label, mgoDuration);
    expect(result).toEqual<SingleValue>({
        label: testMessage(label),
        type: `SINGLE_VALUE`,
        value: { display: format.valueWithUnit(mgoDuration.value, mgoDuration.unit) },
    });
});
