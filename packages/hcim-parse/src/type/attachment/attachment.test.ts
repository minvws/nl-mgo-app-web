import { faker } from '$test';
import { expect, test } from 'vitest';
import { attachment } from './attachment.js';

test('string', () => {
    const value = faker.fhir.attachment();
    const result = attachment(value);
    const expected = {
        _type: 'attachment',
        contentType: value?.contentType,
        language: value?.language,
        data: value?.data,
        url: value?.url,
        size: value?.size,
        hash: value?.hash,
        title: value?.title,
        creation: value?.creation,
    };
    expect(result).toEqual(expected);
});
