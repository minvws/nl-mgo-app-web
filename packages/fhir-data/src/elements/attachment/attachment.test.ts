import { faker, testSet } from '$test';
import { expect, test } from 'vitest';
import { attachment } from './attachment';

testSet(
    'zibAttachment parses successfully',
    faker.fhir.attachment,
    (data) => {
        const schema = attachment.parse(data);
        expect(schema).toEqual(
            expect.objectContaining({
                title: data.title,
            })
        );
    },
    false
);

test('zibAttachment parses successfully when there data is undefined', () => {
    const zibData = attachment.parse(undefined);
    expect(zibData).toEqual(
        expect.objectContaining({
            title: undefined,
        })
    );
});

testSet(
    'zibAttachment UI schema group is created successfully',
    () => {
        const data = faker.fhir.attachment();
        return attachment.parse(data);
    },
    (data) => {
        const schema = attachment.uiSchemaGroup(data);
        expect(schema.label).toBe('attachment');
    },
    false
);
