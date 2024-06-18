import { setupWithAppProviders, flushCallStack } from '$test/helpers';
import { screen } from '@testing-library/react';
import { type MockedFunction, test, vi, beforeEach } from 'vitest';
import { LaboratoryResults } from './LaboratoryResults';
import observations from './fixtures/fhir-observations.json';
import { useHealthcareOrganizationsStore } from '$/store';
import { useParams } from '$/routing';
import { kebabCase } from 'lodash';
import { faker } from '@faker-js/faker';
import { healthcareOrganizationDTO } from '$test/data';

vi.mock('$/api/bgz', () => ({
    bgz: {
        getLastLaboratoryResultsPerType: vi.fn(() => ({
            json: () => Promise.resolve(observations),
        })),
    },
}));

vi.mock(
    '$/routing/useParams',
    () =>
        ({
            useParams: vi.fn(),
            // eslint-disable-next-line @typescript-eslint/consistent-type-imports
        }) as typeof import('$/routing/useParams')
);

beforeEach(() => {
    const organizationName = faker.company.name();
    const { addHealthcareOrganization } = useHealthcareOrganizationsStore.getState();

    (useParams as MockedFunction<typeof useParams>).mockImplementation(() => ({
        healthcareOrganizationSlug: kebabCase(organizationName),
    }));

    addHealthcareOrganization(healthcareOrganizationDTO({ display_name: organizationName }));
});

test('shows laboratory results list', async () => {
    setupWithAppProviders(<LaboratoryResults />);
    await flushCallStack(2);

    screen.getByRole('heading', {
        name: 'Bevinding betreffende laboratoriumonderzoek (bevinding)',
    });

    screen.getByText('Chloride [mol/volume] in bloed');
});
