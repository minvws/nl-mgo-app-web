import { faker } from '$test';
import { expect, test } from 'vitest';
import { attachment } from '../../../r3/elements';
import { downloadLink } from './downloadLink';

test('downloadLink', () => {
    const value = attachment.parse(faker.fhir.attachment());
    value.title = faker.lorem.word();
    value.url = faker.internet.url();
    const options = faker.custom.uiEntryOptions();

    const uiDownloadLink = downloadLink(faker.custom.i18nContext());
    const result = uiDownloadLink(value, options);
    expect(result).toEqual({
        type: 'DOWNLOAD_LINK',
        label: value.title,
        url: value.url,
        ...options,
    });
});

test('downloadLink values default to empty string', () => {
    const value = attachment.parse(faker.fhir.attachment());
    value.title = undefined;
    value.url = undefined;
    const options = faker.custom.uiEntryOptions();

    const uiDownloadLink = downloadLink(faker.custom.i18nContext());
    const result = uiDownloadLink(value, options);
    expect(result).toEqual({
        type: 'DOWNLOAD_LINK',
        label: '',
        url: '',
        ...options,
    });
});
