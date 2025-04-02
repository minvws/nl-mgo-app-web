import { faker } from '$test';
import { type FhirIntlShape } from '@minvws/mgo-mgo-intl';
import { createTestIntl, testMessage } from '@minvws/mgo-mgo-intl/test';
import { expect, test } from 'vitest';
import { type MgoString } from '../../../parse/type';
import { createLabelFormatter } from './formatLabel';

test('Returns label if it exists', async () => {
    const mockIntl = createTestIntl<string>() as FhirIntlShape;
    const formatLabel = createLabelFormatter(mockIntl);
    const label = faker.custom.fhirMessageId();

    mockIntl.messages[label] = faker.lorem.sentence();

    const result = formatLabel(label, {});
    expect(result).toBe(testMessage(label));
});

test(`Uses label without extension, if the label has an extension and the label itself doesn't exist`, async () => {
    const mockIntl = createTestIntl<string>() as FhirIntlShape;
    const formatLabel = createLabelFormatter(mockIntl);
    const value: MgoString = {
        _type: 'string',
        value: faker.lorem.word(),
    };
    const label = faker.custom.fhirMessageId();
    const labelWithExtension = `${label}_${value._type}`;

    mockIntl.messages[label] = faker.lorem.sentence();

    const result = formatLabel(labelWithExtension, value);
    expect(result).toBe(testMessage(label));
});

test(`Attempts to return the label even if we know it doesn't exist`, async () => {
    const mockIntl = createTestIntl<string>() as FhirIntlShape;
    const formatLabel = createLabelFormatter(mockIntl);
    const label = faker.custom.fhirMessageId();

    const result = formatLabel(label, {});
    expect(result).toBe(testMessage(label));
});
