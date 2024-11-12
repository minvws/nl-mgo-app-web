import { faker } from '$test';
import { expect, test } from 'vitest';
import { parseContent } from './content';

const mockContent = () => ({
    attachment: faker.fhir.attachment(),
});

test('content parses successfully', () => {
    const content = mockContent();
    const schema = parseContent(content);
    expect(schema).toEqual(
        expect.objectContaining({
            attachment: content.attachment,
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
