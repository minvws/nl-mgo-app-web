import { useOrganization } from '$/hooks';
import { flushCallStack, message, setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { type Mock, test, vi } from 'vitest';
import { Documents } from './Documents';
import fhirDocumentReferences from './fixtures/fhir-document-references.json';

vi.mock('$/hooks/useOrganization/useOrganization');
test('shows documents list', async () => {
    (useOrganization().getDocumentsService as Mock).mockImplementationOnce(
        () =>
            ({
                getDocumentReferences: () => ({
                    json: vi.fn(() => Promise.resolve(fhirDocumentReferences)),
                }),
            }) as any // eslint-disable-line @typescript-eslint/no-explicit-any,
    );

    setupWithAppProviders(<Documents />);
    await flushCallStack(2);

    screen.getByRole('heading', {
        name: 'Documenten',
    });
});

test('shows no results when there is no data service available', async () => {
    setupWithAppProviders(<Documents />);
    await flushCallStack(2);

    screen.getByRole('heading', {
        name: message('common.no_results_heading'),
    });
});
