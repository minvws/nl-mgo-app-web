import { setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { test, vi } from 'vitest';

import { flushCallStack } from '$test/flushCallstack';
import fhirProblems from './fixtures/fhir-problem-statements.json';
import { Problems } from './Problems';

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
