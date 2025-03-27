import { faker } from '$test';
import { expect, test } from 'vitest';
import { dateTime } from '../dateTime/dateTime';
import { unsignedInt } from '../unsignedInt/unsignedInt';
import { attachment } from './attachment';

test('string', () => {
    const value = faker.fhir.attachment();
    const result = attachment(value);
    const expected = {
        _type: 'Attachment',
        contentType: value?.contentType,
        language: value?.language,
        data: value?.data,
        url: value?.url,
        size: unsignedInt(value?.size),
        hash: value?.hash,
        title: value?.title,
        creation: dateTime(value?.creation),
    };
    expect(result).toEqual(expected);
});
