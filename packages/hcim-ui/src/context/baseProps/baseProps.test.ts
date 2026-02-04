import { faker } from '$test';
import { type FhirIntlShape } from '@minvws/mgo-intl';
import { createTestIntl, testMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test } from 'vitest';
import { createBaseProps } from './baseProps.js';

test('Returns id set to the label', async () => {
    const mockIntl = createTestIntl<string>() as FhirIntlShape;
    const baseProps = createBaseProps(mockIntl);
    const label = faker.custom.fhirMessageId();

    mockIntl.messages[label] = faker.lorem.sentence();

    const result = baseProps(label, {});
    expect(result.id).toBe(label);
});

test('Returns label formatted using formatLabel', async () => {
    const mockIntl = createTestIntl<string>() as FhirIntlShape;
    const baseProps = createBaseProps(mockIntl);
    const label = faker.custom.fhirMessageId();

    mockIntl.messages[label] = faker.lorem.sentence();

    const result = baseProps(label, {});
    expect(result.label).toBe(testMessage(label));
});

test('Passes defaultLabel option to formatLabel', async () => {
    const mockIntl = createTestIntl<string>() as FhirIntlShape;
    const baseProps = createBaseProps(mockIntl);
    const label = faker.custom.fhirMessageId();
    const defaultLabel = faker.custom.fhirMessageId();

    mockIntl.messages[defaultLabel] = faker.lorem.sentence();

    const result = baseProps(label, {}, { defaultLabel });
    expect(result.label).toBe(testMessage(defaultLabel));
});
