import { faker } from '$test';
import { expect, test } from 'vitest';
import { attachment } from './attachment.js';

test('attachment', () => {
    const value = faker.mgo.attachment();
    value.title = faker.fhir.string();
    value.url = faker.internet.url();

    const uiDownloadLink = attachment(faker.ui.context());
    const result = uiDownloadLink(value);
    expect(result).toEqual({
        id: value.title,
        type: 'DOWNLOAD_LINK',
        label: value.title,
        url: value.url,
    });
});

test('attachment where value is a binary reference', () => {
    const value = faker.mgo.attachment();
    value.title = faker.fhir.string();
    value.url = 'Binary/test';

    const uiDownloadLink = attachment(faker.ui.context());
    const result = uiDownloadLink(value);
    expect(result).toEqual({
        type: 'DOWNLOAD_BINARY',
        id: value.title,
        label: value.title,
        reference: value.url,
    });
});

test('attachment values default unknown label and no url', () => {
    const value = faker.mgo.attachment();
    value.title = undefined;
    value.url = undefined;

    const uiDownloadLink = attachment(faker.ui.context());
    const result = uiDownloadLink(value);
    expect(result).toEqual({
        type: 'DOWNLOAD_LINK',
        id: 'intl(fhir.unknown)',
        label: 'intl(fhir.unknown)',
        url: undefined,
    });
});
