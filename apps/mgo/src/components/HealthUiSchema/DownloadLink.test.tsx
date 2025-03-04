import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { type DownloadLink as UiDownloadLink } from '@minvws/mgo-fhir-data';
import { appMessage } from '@minvws/mgo-mgo-intl/test';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { DownloadLink } from './DownloadLink';

test('DownloadLink renders with regular href', async () => {
    const value: UiDownloadLink = {
        label: faker.lorem.sentence(),
        url: faker.internet.url(),
        type: 'DOWNLOAD_LINK',
    };
    setupWithAppProviders(<DownloadLink value={value} />);
    const downloadLink = screen.getByRole('link', { name: value.label });
    expect(downloadLink.getAttribute('href')).toBe(value.url);
});

test('DownloadLink renders not found when url is empty', async () => {
    const value: UiDownloadLink = {
        label: faker.lorem.sentence(),
        url: undefined,
        type: 'DOWNLOAD_LINK',
    };
    setupWithAppProviders(<DownloadLink data-testid="download_link" value={value} />);
    const downloadLink = screen.getByTestId('download_link');
    expect(downloadLink).toHaveTextContent(appMessage('hc_documents.no_document'));
});
