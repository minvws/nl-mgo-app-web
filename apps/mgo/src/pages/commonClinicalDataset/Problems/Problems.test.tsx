import { flushCallStack, message, setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { type Mock, test, vi } from 'vitest';
import { Problems } from './Problems';
import fhirProblems from './fixtures/fhir-problem-statements.json';
import { useOrganization } from '$/hooks';

vi.mock('$/hooks/useOrganization/useOrganization');
test('shows problems list', async () => {
    (useOrganization().getCommonClinicalDataset as Mock).mockImplementationOnce(
        () =>
            ({
                getProblems: () => ({
                    json: vi.fn(() => Promise.resolve(fhirProblems)),
                }),
            }) as any // eslint-disable-line @typescript-eslint/no-explicit-any
    );

    setupWithAppProviders(<Problems />);
    await flushCallStack(2);

    screen.getByRole('heading', {
        name: 'Amyotrofe laterale sclerose',
    });
    screen.getByText('Fractuur van pols (aandoening)');
});

test('shows no results when there is no data service available', async () => {
    setupWithAppProviders(<Problems />);
    await flushCallStack(2);

    screen.getByRole('heading', {
        name: message('common.no_results_heading'),
    });
});
