import { faker } from '$test';
import { expect, test } from 'vitest';
import { parseContent } from './content';

const mockContent = () => ({
    pAttachment: faker.fhir.attachment(),
    pReference: faker.fhir.reference(),
});

test('content parses successfully', () => {
    const content = mockContent();
    const schema = parseContent(content);
    expect(schema).toEqual(
        expect.objectContaining({
            attachment: content.pAttachment,
            reference: content.pReference,
        })
    );
});

test('content parses successfully when value is undefined', () => {
    const content = undefined;
    const schema = parseContent(content);
    expect(schema).toEqual(
        expect.objectContaining({
            attachment: undefined,
        })
    );
});
