import { faker } from '$test';
import { testMessage } from '@minvws/mgo-intl/test';
import { expect, test, vi } from 'vitest';
import { identifier } from './identifier';

test('identifier, with existing label', () => {
    const label = faker.custom.fhirMessageId();
    const mgoIdentifier = faker.mgo.identifier();
    const context = faker.custom.uiHelperContext();
    vi.spyOn(context, 'hasMessage').mockReturnValueOnce(true);

    const result = identifier(context)(label, mgoIdentifier);
    expect(result).toEqual({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: mgoIdentifier.value,
    });
});
