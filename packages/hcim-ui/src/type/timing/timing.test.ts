import { faker } from '$test';
import { type FhirMessagesIds, testMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test } from 'vitest';
import { codeableConcept } from '../codeableConcept/codeableConcept.js';
import { timing } from './timing.js';

test('timing', () => {
    const label = faker.custom.fhirMessageId();
    const value = faker.mgo.timing();
    const uiHelperContext = faker.ui.context();
    const result = timing(uiHelperContext)(label, value);

    expect(result).toEqual({
        label: testMessage(label),
        children: expect.arrayContaining([
            codeableConcept(uiHelperContext)(`${label}.code` as FhirMessagesIds, value?.code),
        ]),
    });
});
