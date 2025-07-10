import { faker } from '$test';
import { type FhirIntlShape, type FhirMessagesIds } from '@minvws/mgo-intl';
import { createTestIntl, testMessage } from '@minvws/mgo-intl/test';
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

test(`Does not use the label without extension, if the label does not end with the extension`, async () => {
    const mockIntl = createTestIntl<string>() as FhirIntlShape;
    const formatLabel = createLabelFormatter(mockIntl);
    const value: MgoString = {
        _type: 'string',
        value: faker.lorem.word(),
    };
    const label = faker.custom.fhirMessageId();
    const labelWithExtension = `${label}_${value._type}`;

    mockIntl.messages[label] = faker.lorem.sentence();

    const result = formatLabel(`${labelWithExtension}.foo`, value);
    expect(result).toBe(testMessage(`${labelWithExtension}.foo`));
});

test(`Uses label without extension, even if the value is an array`, async () => {
    const mockIntl = createTestIntl<string>() as FhirIntlShape;
    const formatLabel = createLabelFormatter(mockIntl);
    const value: MgoString[] = [
        {
            _type: 'string',
            value: faker.lorem.word(),
        },
    ];
    const label = faker.custom.fhirMessageId();
    const labelWithExtension = `${label}_${value[0]._type}`;

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

test.each([
    [`r3.${faker.lorem.word()}.foo`, 'fhir.x.foo'],
    [`r3.${faker.lorem.word()}.foo.baz`, 'fhir.x.baz'],
    [`r4.${faker.lorem.word()}.bar`, 'fhir.x.bar'],
])(
    `For properties on zib resources, a fhir.x label is used if available: %s - %s`,
    async (labelId, expectedLabelId) => {
        const mockIntl = createTestIntl<string>() as FhirIntlShape;
        const formatLabel = createLabelFormatter(mockIntl);

        mockIntl.messages[expectedLabelId as FhirMessagesIds] = faker.lorem.sentence();

        const result = formatLabel(labelId, {});
        expect(result).toBe(testMessage(expectedLabelId));
    }
);

test(`Uses the fhir.x label without extension, if the label has an extension and the label itself doesn't exist`, async () => {
    const mockIntl = createTestIntl<string>() as FhirIntlShape;
    const formatLabel = createLabelFormatter(mockIntl);
    const value: MgoString = {
        _type: 'string',
        value: faker.lorem.word(),
    };
    const resource = faker.lorem.word();
    const path = faker.lorem.word();
    const label = `r3.${resource}.${path}`;
    const labelWithExtension = `${label}_${value._type}`;

    mockIntl.messages[`fhir.x.${path}` as FhirMessagesIds] = faker.lorem.sentence();

    const result = formatLabel(labelWithExtension, value);
    expect(result).toBe(testMessage(`fhir.x.${path}`));
});

test.each([`r3.${faker.lorem.word()}`, `r4.${faker.lorem.word()}`])(
    `Does not attempt to use a fallback if the label does not reference a property %s - %s`,
    async (labelId) => {
        const mockIntl = createTestIntl<string>() as FhirIntlShape;
        const formatLabel = createLabelFormatter(mockIntl);

        mockIntl.messages[`fhir.x` as FhirMessagesIds] = faker.lorem.sentence();

        const result = formatLabel(labelId, {});
        expect(result).toBe(testMessage(labelId));
    }
);

test('Uses a fallback label if it is provided and exists', async () => {
    const mockIntl = createTestIntl<string>() as FhirIntlShape;
    const formatLabel = createLabelFormatter(mockIntl);
    const label = faker.custom.fhirMessageId();
    const fallbackLabel = faker.custom.fhirMessageId();

    mockIntl.messages[fallbackLabel] = faker.lorem.sentence();

    const result = formatLabel(label, {}, fallbackLabel);
    expect(result).toBe(testMessage(fallbackLabel));
});
