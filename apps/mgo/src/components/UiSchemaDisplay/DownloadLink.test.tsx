import { getDataService } from '$/services';
import { faker } from '$test/faker';
import { flushCallStack, message, setupWithAppProviders } from '$test/helpers';
import { type DownloadLink as UiDownloadLink } from '@minvws/mgo-fhir-data';
import { screen } from '@testing-library/react';
import { beforeEach, expect, test, vi, type MockedFunction } from 'vitest';
import { DownloadLink } from './DownloadLink';

const mockGetResource = getDataService(undefined, undefined)!.getResource as MockedFunction<
    () => unknown
>;

vi.mock('$/services', async (importOriginal) => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    const mod = await importOriginal<typeof import('$/services')>();
    const mockDataService = {
        getResource: vi.fn(),
    };
    return {
        ...mod,
        getDataService: () => mockDataService,
    };
});

beforeEach(() => {
    vi.resetAllMocks();
});

const base64Pdf = `JVBERi0xLjEKJcKlwrHDqwoKMSAwIG9iagogIDw8IC9UeXBlIC9DYXRhbG9nCiAgICAgL1BhZ2VzIDIgMCBSCiAgPj4KZW5kb2JqCgoyIDAgb2JqCiAgPDwgL1R5cGUgL1BhZ2VzCiAgICAgL0tpZHMgWzMgMCBSXQogICAgIC9Db3VudCAxCiAgICAgL01lZGlhQm94IFswIDAgMzAwIDE0NF0KICA+PgplbmRvYmoKCjMgMCBvYmoKICA8PCAgL1R5cGUgL1BhZ2UKICAgICAgL1BhcmVudCAyIDAgUgogICAgICAvUmVzb3VyY2VzCiAgICAgICA8PCAvRm9udAogICAgICAgICAgIDw8IC9GMQogICAgICAgICAgICAgICA8PCAvVHlwZSAvRm9udAogICAgICAgICAgICAgICAgICAvU3VidHlwZSAvVHlwZTEKICAgICAgICAgICAgICAgICAgL0Jhc2VGb250IC9UaW1lcy1Sb21hbgogICAgICAgICAgICAgICA+PgogICAgICAgICAgID4+CiAgICAgICA+PgogICAgICAvQ29udGVudHMgNCAwIFIKICA+PgplbmRvYmoKCjQgMCBvYmoKICA8PCAvTGVuZ3RoIDU1ID4+CnN0cmVhbQogIEJUCiAgICAvRjEgMTggVGYKICAgIDAgMCBUZAogICAgKEhlbGxvIFdvcmxkKSBUagogIEVUCmVuZHN0cmVhbQplbmRvYmoKCnhyZWYKMCA1CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAxOCAwMDAwMCBuIAowMDAwMDAwMDc3IDAwMDAwIG4gCjAwMDAwMDAxNzggMDAwMDAgbiAKMDAwMDAwMDQ1NyAwMDAwMCBuIAp0cmFpbGVyCiAgPDwgIC9Sb290IDEgMCBSCiAgICAgIC9TaXplIDUKICA+PgpzdGFydHhyZWYKNTY1CiUlRU9GCg==`;

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

test('DownloadLink preloads data when passed a Binary reference', async () => {
    const binaryId = faker.string.uuid();
    const value: UiDownloadLink = {
        label: faker.lorem.sentence(),
        url: `Binary/${binaryId}`,
        type: 'DOWNLOAD_LINK',
    };

    const response = {
        json: vi.fn(async () => ({
            content: base64Pdf,
            contentType: 'application/pdf',
        })),
    };
    mockGetResource.mockImplementationOnce(() => response);

    setupWithAppProviders(<DownloadLink value={value} data-testid="download-link" />);

    const mockBlobUrl = 'blob:http://localhost';
    vi.spyOn(global, 'fetch').mockImplementationOnce(() =>
        Promise.resolve({ blob: () => Promise.resolve({}) } as Response)
    );
    vi.stubGlobal('URL', { createObjectURL: vi.fn(() => mockBlobUrl) });

    const downloadLink = screen.getByTestId('download-link');
    expect(downloadLink.textContent).toContain(message('common.loading'));

    await flushCallStack(2);

    expect(downloadLink.textContent).not.toContain(message('common.loading'));
    expect(downloadLink.getAttribute('href')).toBe(mockBlobUrl);
});
