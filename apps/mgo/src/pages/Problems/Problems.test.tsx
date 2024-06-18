import { flushCallStack, setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { test, vi } from 'vitest';
import { Problems } from './Problems';
import fhirProblems from './fixtures/fhir-problem-statements.json';

vi.mock('$/api/bgz', () => ({
    bgz: {
        getProblems: vi.fn(() => ({
            json: () => Promise.resolve(fhirProblems),
        })),
    },
}));

test('shows medication list', async () => {
    setupWithAppProviders(<Problems />);
    await flushCallStack(2);

    screen.getByRole('heading', {
        name: 'Amyotrofe laterale sclerose',
    });

    screen.getByText('Fractuur van pols (aandoening)');
});
