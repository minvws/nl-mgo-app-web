import { faker } from '$test';
import { expect, test } from 'vitest';
import { parse } from '../../../../../parse';
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
            attachment: parse.attachment(content.pAttachment),
            reference: parse.reference(content.pReference),
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
