import { faker } from '$test';
import { expect, test } from 'vitest';
import { attachment as zibAttachment } from '../../../r3/elements';
import { attachment } from './attachment';
import { type MgoString } from '../../../parse/type';

test('attachment', () => {
    const value = zibAttachment.parse(faker.fhir.attachment());
    value.title = faker.fhir.string();
    value.url = faker.internet.url() as MgoString;

    const uiDownloadLink = attachment(faker.custom.uiHelperContext());
    const result = uiDownloadLink(value);
    expect(result).toEqual({
        type: 'DOWNLOAD_LINK',
        label: value.title,
        url: value.url,
    });
});

test('attachment values default unknown label and no url', () => {
    const value = zibAttachment.parse(faker.fhir.attachment());
    value.title = undefined;
    value.url = undefined;

    const uiDownloadLink = attachment(faker.custom.uiHelperContext());
    const result = uiDownloadLink(value);
    expect(result).toEqual({
        type: 'DOWNLOAD_LINK',
        label: 'intl(fhir.unknown)',
        url: undefined,
    });
});
