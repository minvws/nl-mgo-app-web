import * as hooks from '$/hooks';
import { flushCallStack, message, setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { test, vi } from 'vitest';
import { Problems } from './Problems';
import fhirProblems from './fixtures/fhir-problem-statements.json';
import { faker } from '$test/faker';

const useOrganizationMock = vi.spyOn(hooks, 'useOrganization');

test('shows problems list', async () => {
    const organization = faker.custom.healthcareOrganization();
    useOrganizationMock.mockImplementation(() => ({
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
    useOrganizationMock.mockImplementation(() => ({
        organization,
        getCommonClinicalDataset: () => null,
    }));

    setupWithAppProviders(<Problems />);
    await flushCallStack(2);

    screen.getByRole('heading', {
        name: message('common.no_results_heading'),
    });
});
