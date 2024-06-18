import { setupWithAppProviders, flushCallStack } from '$test/helpers';
import { screen } from '@testing-library/react';
import { type MockedFunction, test, vi, beforeEach } from 'vitest';
import { Medication } from './Medication';
import fhirMedicationStatements from './fixtures/fhir-medication-statements.json';
import { faker } from '@faker-js/faker';
import { useHealthcareOrganizationsStore } from '$/store';
import { useParams } from '$/routing';
import { kebabCase } from 'lodash';
import { healthcareOrganizationDTO } from '$test/data';

vi.mock('$/api/bgz', () => ({
    bgz: {
        getMedicationUse: vi.fn(() => ({
            json: () => Promise.resolve(fhirMedicationStatements),
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

test('shows medication list', async () => {
    setupWithAppProviders(<Medication />);
    await flushCallStack(2);

    screen.getByRole('heading', {
        name: 'Zestril tablet 10mg',
    });

    screen.getByText('1 maal per dag 1 tablet, oraal');
});
