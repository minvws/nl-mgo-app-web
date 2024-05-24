import { setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { test, vi } from 'vitest';
import { Medication } from './Medication';

import { flushCallStack } from '$test/flushCallstack';
import fhirMedicationStatements from './fixtures/fhir-medication-statements.json';

vi.mock('$/api/bgz', () => ({
    bgz: {
        getMedicationUse: vi.fn(() => ({
            json: () => Promise.resolve(fhirMedicationStatements),
        })),
    },
}));

test('shows medication list', async () => {
    setupWithAppProviders(<Medication />);
    await flushCallStack(2);

    screen.getByText('PARACETAMOL TABLET 500MG');
    screen.getByText('Metoclopramide zetpil 20mg');
});
