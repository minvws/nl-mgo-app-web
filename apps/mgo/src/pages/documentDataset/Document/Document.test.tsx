import { flushCallStack, message, setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { afterEach, type Mock, type MockedFunction, test, vi } from 'vitest';
import { Document } from './Document';
import fhirDocumentReference from './fixtures/fhir-document-reference.json';
import { useOrganization } from '$/hooks';
import { useParams } from '$/routing';
import { faker } from '$test/faker';

const mockUseParams = useParams as MockedFunction<typeof useParams>;

vi.mock('$/hooks/useOrganization/useOrganization');
vi.mock(
    '$/routing/useParams',
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    () => ({ useParams: vi.fn() }) as typeof import('$/routing/useParams')
);

afterEach(() => {
    vi.restoreAllMocks();
});

test('shows document detail page', async () => {
    const documentId = faker.string.uuid();
    mockUseParams.mockImplementation(() => ({ documentId: documentId }));
    (useOrganization().getDocumentsService as Mock).mockImplementation(
        () =>
            ({
                getDocumentReference: () => ({
                    json: vi.fn(() => Promise.resolve(fhirDocumentReference)),
                }),
            }) as any // eslint-disable-line @typescript-eslint/no-explicit-any,
    );

    setupWithAppProviders(<Document />);
    await flushCallStack(2);

    screen.getByRole('heading', {
        name: 'Discharge summary',
    });
});

test('shows no results when there is no data service available', async () => {
    const documentId = faker.string.uuid();
    mockUseParams.mockImplementation(() => ({ documentId: documentId }));
    setupWithAppProviders(<Document />);
    await flushCallStack();

    screen.getByRole('heading', {
        name: message('not_found.heading'),
    });
});
