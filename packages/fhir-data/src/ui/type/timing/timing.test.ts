import { faker } from '$test';
import { type FhirMessagesIds, testMessage } from '@minvws/mgo-mgo-intl/test';
import { expect, test } from 'vitest';
import { codeableConcept } from '../codeableConcept/codeableConcept';
import { timing } from './timing';

test('timing', () => {
    const label = faker.custom.fhirMessageId();
    const value = faker.mgo.timing();
    const uiHelperContext = faker.custom.uiHelperContext();
    const result = timing(uiHelperContext)(label, value);

    expect(result).toEqual({
        label: testMessage(label),
        children: expect.arrayContaining([
            codeableConcept(uiHelperContext)(`${label}.code` as FhirMessagesIds, value?.code),
        ]),
    });
});
