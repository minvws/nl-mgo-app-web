import { flushCallStack, message, setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { type Mock, test, vi } from 'vitest';
import { Medication } from './Medication';
import fhirMedicationStatements from './fixtures/fhir-medication-statements.json';
import { useOrganization } from '$/hooks';

vi.mock('$/hooks/useOrganization/useOrganization');
test('shows medication list', async () => {
    (useOrganization().getCommonClinicalDataset as Mock).mockImplementationOnce(
        () =>
            ({
                getMedicationUse: () => ({
                    json: vi.fn(() => Promise.resolve(fhirMedicationStatements)),
                }),
            }) as any // eslint-disable-line @typescript-eslint/no-explicit-any
    );
    setupWithAppProviders(<Medication />);
    await flushCallStack(2);

    screen.getByRole('heading', {
        name: 'Zestril tablet 10mg',
    });
    screen.getByText('1 maal per dag 1 tablet, oraal');
});

test('shows no results when there is no data service available', async () => {
    setupWithAppProviders(<Medication />);
    await flushCallStack(2);

    screen.getByRole('heading', {
        name: message('common.no_results_heading'),
    });
});
