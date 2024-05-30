import { setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { test, vi } from 'vitest';
import { LaboratoryResults } from './LaboratoryResults';

import { flushCallStack } from '$test/flushCallstack';
import observations from './fixtures/fhir-observations.json';

vi.mock('$/api/bgz', () => ({
    bgz: {
        getLastLaboratoryResultsPerType: vi.fn(() => ({
            json: () => Promise.resolve(observations),
        })),
    },
}));

test('shows laboratory results list', async () => {
    setupWithAppProviders(<LaboratoryResults />);
    await flushCallStack(2);

    screen.getByRole('heading', {
        name: 'Bevinding betreffende laboratoriumonderzoek (bevinding)',
    });

    screen.getByText('Chloride [mol/volume] in bloed');
});
