import * as hooks from '$/hooks';
import { faker } from '$test/faker';
import { flushCallStack, setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { test, vi } from 'vitest';
import { Medication } from './Medication';
import fhirMedicationStatements from './fixtures/fhir-medication-statements.json';

const useOrganizationMock = vi.spyOn(hooks, 'useOrganization');

test('shows medication list', async () => {
    const organization = faker.custom.healthcareOrganization();
    useOrganizationMock.mockImplementation(() => ({
        organization,
        getCommonClinicalDataset: () =>
            ({
                getMedicationUse: () => ({
                    json: vi.fn(() => Promise.resolve(fhirMedicationStatements)),
                }),
            }) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    }));

    setupWithAppProviders(<Medication />);
    await flushCallStack(2);

    screen.getByRole('heading', {
        name: 'Zestril tablet 10mg',
    });
    screen.getByText('1 maal per dag 1 tablet, oraal');
});

test('shows no results when there is no data service available', async () => {
    const organization = faker.custom.healthcareOrganization();
    useOrganizationMock.mockImplementation(() => ({
        organization,
        getCommonClinicalDataset: () => null,
    }));

    setupWithAppProviders(<Medication />);
    await flushCallStack(2);

    screen.getByRole('heading', {
        name: 'Geen gegevens gevonden',
    });
});
