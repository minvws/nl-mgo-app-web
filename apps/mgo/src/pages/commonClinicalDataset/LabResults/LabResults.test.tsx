import * as hooks from '$/hooks';
import { flushCallStack, message, setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { test, vi } from 'vitest';
import { LabResults } from './LabResults';
import observations from './fixtures/fhir-observations.json';
import { faker } from '$test/faker';

const useOrganizationMock = vi.spyOn(hooks, 'useOrganization');

test('shows laboratory results list', async () => {
    const organization = faker.custom.healthcareOrganization();
    useOrganizationMock.mockImplementation(() => ({
        organization,
        getCommonClinicalDataset: () =>
            ({
                getLastLaboratoryResultsPerType: () => ({
                    json: vi.fn(() => Promise.resolve(observations)),
                }),
            }) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    }));

    setupWithAppProviders(<LabResults />);
    await flushCallStack(2);

    screen.getByRole('heading', {
        name: 'Bevinding betreffende laboratoriumonderzoek (bevinding)',
    });
    screen.getByText('Chloride [mol/volume] in bloed');
});

test('shows no results when there is no data service available', async () => {
    const organization = faker.custom.healthcareOrganization();
    useOrganizationMock.mockImplementation(() => ({
        organization,
        getCommonClinicalDataset: () => null,
    }));

    setupWithAppProviders(<LabResults />);
    await flushCallStack(2);

    screen.getByRole('heading', {
        name: message('common.no_results_heading'),
    });
});
