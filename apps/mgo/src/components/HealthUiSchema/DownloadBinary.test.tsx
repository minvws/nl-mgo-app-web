import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { type DownloadBinary as UiDownloadBinary } from '@minvws/mgo-hcim-ui';
import { appMessage } from '@minvws/mgo-intl/test/shared';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { screen, within } from '@testing-library/react';
import { ReactNode } from 'react';
import { beforeEach, expect, test, vi } from 'vitest';
import { DownloadBinary } from './DownloadBinary';
import { HealthUiSchemaContext } from './HealthUiSchemaContext';
import { useBinaryReference } from './hooks/useBinaryReference';

vi.mock('./hooks/useBinaryReference', () => ({
    useBinaryReference: vi.fn(),
}));

beforeEach(() => {
    vi.resetAllMocks();
});

function setup(comp: ReactNode) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
        },
    });

    return setupWithAppProviders(
        <QueryClientProvider client={queryClient}>
            <HealthUiSchemaContext.Provider value={{ resource: faker.custom.resource() }}>
                {comp}
            </HealthUiSchemaContext.Provider>
        </QueryClientProvider>
    );
}

test('DownloadBinary uses blob url for the link', async () => {
    const binaryBlobUrl = faker.internet.url();

    vi.mocked(useBinaryReference).mockReturnValue({
        isError: false,
        isLoading: false,
        isEmpty: false,
        retryQuery: vi.fn(),
        binaryBlobUrl,
    });

    const value: UiDownloadBinary = {
        label: faker.lorem.sentence(),
        reference: `Binary/${faker.string.uuid()}`,
        type: 'DOWNLOAD_BINARY',
    };

    setup(<DownloadBinary value={value} data-testid="download-binary" />);

    const downloadLink = screen.getByTestId('download-binary');

    expect(downloadLink.getAttribute('href')).toBe(binaryBlobUrl);
});

test('DownloadBinary shows if there is no content', async () => {
    vi.mocked(useBinaryReference).mockReturnValue({
        isError: false,
        isLoading: false,
        isEmpty: true,
        retryQuery: vi.fn(),
        binaryBlobUrl: undefined,
    });

    const value: UiDownloadBinary = {
        label: faker.lorem.sentence(),
        reference: `Binary/${faker.string.uuid()}`,
        type: 'DOWNLOAD_BINARY',
    };

    setup(<DownloadBinary value={value} data-testid="download-binary" />);

    const downloadBinary = screen.getByTestId('download-binary');
    expect(downloadBinary).toHaveTextContent(appMessage('hc_documents.no_document'));
});

test('DownloadBinary shows an error if there is one', async () => {
    const retryQuery = vi.fn();

    vi.mocked(useBinaryReference).mockReturnValue({
        isError: true,
        isLoading: false,
        isEmpty: false,
        retryQuery,
        binaryBlobUrl: undefined,
    });

    const value: UiDownloadBinary = {
        label: faker.lorem.sentence(),
        reference: `Binary/${faker.string.uuid()}`,
        type: 'DOWNLOAD_BINARY',
    };

    const { user } = setup(<DownloadBinary value={value} data-testid="download-binary" />);

    const downloadLink = screen.getByTestId('download-binary');
    expect(downloadLink).toHaveTextContent(appMessage('hc_documents.error'));

    const retryButton = within(downloadLink).getByRole('button');
    await user.click(retryButton);

    expect(retryQuery).toHaveBeenCalledTimes(1);
});
