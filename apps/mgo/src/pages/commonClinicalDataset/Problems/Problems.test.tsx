import * as hooks from '$/hooks';
import { flushCallStack, setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { test, vi } from 'vitest';
import { Problems } from './Problems';
import fhirProblems from './fixtures/fhir-problem-statements.json';
import { faker } from '$test/faker';

const useHealthcareOrganizationMock = vi.spyOn(hooks, 'useHealthcareOrganization');

test('shows problems list', async () => {
    const organization = faker.custom.healthcareOrganization();
    useHealthcareOrganizationMock.mockImplementation(() => ({
        organization,
        getCommonClinicalDataset: () =>
            ({
                getProblems: () => ({
                    json: vi.fn(() => Promise.resolve(fhirProblems)),
                }),
            }) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    }));

    setupWithAppProviders(<Problems />);
    await flushCallStack(2);

    screen.getByRole('heading', {
        name: 'Amyotrofe laterale sclerose',
    });
    screen.getByText('Fractuur van pols (aandoening)');
});

test('shows no results when there is no data service available', async () => {
    const organization = faker.custom.healthcareOrganization();
    useHealthcareOrganizationMock.mockImplementation(() => ({
        organization,
        getCommonClinicalDataset: () => null,
    }));

    setupWithAppProviders(<Problems />);
    await flushCallStack(2);

    screen.getByRole('heading', {
        name: 'Geen gegevens gevonden',
    });
});
