import { getDataService } from '$/services';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { type DownloadBinary as UiDownloadBinary } from '@minvws/mgo-hcim-ui';
import { appMessage } from '@minvws/mgo-intl/test/shared';
import { flushCallStack } from '@minvws/mgo-utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { screen, within } from '@testing-library/react';
import { beforeEach, expect, test, vi, type MockedFunction } from 'vitest';
import { DownloadBinary } from './DownloadBinary';
import { HealthUiSchemaContext } from './HealthUiSchemaContext';

const mockGetResource = getDataService(undefined, undefined)!.getResource as MockedFunction<
    () => unknown
>;

vi.mock('$/services', async (importOriginal) => {
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

test('DownloadBinary preloads data when passed a Binary reference', async () => {
    const binaryId = faker.string.uuid();
    const value: UiDownloadBinary = {
        label: faker.lorem.sentence(),
        reference: `Binary/${binaryId}`,
        type: 'DOWNLOAD_BINARY',
    };

    const response = {
        json: vi.fn(async () => ({
            content: base64Pdf,
            contentType: 'application/pdf',
        })),
    };
    mockGetResource.mockImplementationOnce(() => response);

    setupWithAppProviders(
        <HealthUiSchemaContext.Provider value={{ resource: faker.custom.resource() }}>
            <DownloadBinary value={value} data-testid="download-binary" />
        </HealthUiSchemaContext.Provider>
    );

    const mockBlobUrl = 'blob:http://localhost';
    vi.stubGlobal('URL', { createObjectURL: vi.fn(() => mockBlobUrl) });

    const downloadLink = screen.getByTestId('download-binary');

    await flushCallStack(2);

    expect(downloadLink.getAttribute('href')).toBe(mockBlobUrl);
});

test('DownloadBinary renders error when fetch throws error', async () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
    const spy = vi.spyOn(queryClient, 'invalidateQueries');

    const binaryId = faker.string.uuid();
    const value: UiDownloadBinary = {
        label: faker.lorem.sentence(),
        reference: `Binary/${binaryId}`,
        type: 'DOWNLOAD_BINARY',
    };

    mockGetResource.mockImplementationOnce(() => {
        throw new Error('Error fetching resource');
    });

    const { user } = setupWithAppProviders(
        <QueryClientProvider client={queryClient}>
            <HealthUiSchemaContext.Provider value={{ resource: faker.custom.resource() }}>
                <DownloadBinary value={value} data-testid="download-binary" />
            </HealthUiSchemaContext.Provider>
        </QueryClientProvider>
    );

    await flushCallStack(2);

    const downloadLink = screen.getByTestId('download-binary');
    expect(downloadLink).toHaveTextContent(appMessage('hc_documents.error'));

    const retryButton = within(downloadLink).getByRole('button');
    await user.click(retryButton);

    expect(spy).toHaveBeenCalledTimes(1);
});

test('DownloadBinary renders not found when reference is empty', async () => {
    const value: UiDownloadBinary = {
        label: faker.lorem.sentence(),
        reference: undefined,
        type: 'DOWNLOAD_BINARY',
    };
    setupWithAppProviders(
        <HealthUiSchemaContext.Provider value={{ resource: faker.custom.resource() }}>
            <DownloadBinary value={value} data-testid="download-binary" />
        </HealthUiSchemaContext.Provider>
    );
    const downloadBinary = screen.getByTestId('download-binary');
    expect(downloadBinary).toHaveTextContent(appMessage('hc_documents.no_document'));
});
