import { faker, testUiSchemaContext } from '$test';
import { expect, test } from 'vitest';
import { attachment } from './attachment';

test('zibAttachment parses successfully', () => {
    const data = faker.fhir.attachment();
    const schema = attachment.parse(data);
    expect(schema).toEqual(
        expect.objectContaining({
            title: data.title,
        })
    );
});

test('zibAttachment parses successfully when there data is undefined', () => {
    const zibData = attachment.parse(undefined);
    expect(zibData).toEqual(
        expect.objectContaining({
            title: undefined,
        })
    );
});

test('zibAttachment UI schema group is created successfully', () => {
    const data = attachment.parse(faker.fhir.attachment());
    const schema = attachment.uiSchemaGroup(
        data,
        testUiSchemaContext({
            useMock: true,
            ignoreMissingTranslations: true,
        })
    );
    expect(schema.label).toBe('attachment');
});
