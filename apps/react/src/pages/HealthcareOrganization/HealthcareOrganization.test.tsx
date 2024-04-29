/* eslint-disable @typescript-eslint/consistent-type-imports */

import { useParams } from '$/routing';
import { useHealthcareOrganizationsStore } from '$/store';
import { setupWithAppProviders } from '$test/helpers';
import { faker } from '@faker-js/faker';
import { screen } from '@testing-library/react';
import { kebabCase } from 'lodash';
import { MockedFunction, expect, test, vi } from 'vitest';
import { HealthcareOrganization } from './HealthcareOrganization';
import { healthcareOrganizationDTO } from '$test/data';

vi.mock(
    '$/routing/useParams',
    () =>
        ({
            useParams: vi.fn(),
        }) as typeof import('$/routing/useParams')
);

test('healthcare provider shows details about the provider', () => {
    const organizationName = faker.company.name();
    const { addHealthcareOrganization } = useHealthcareOrganizationsStore.getState();

    (useParams as MockedFunction<typeof useParams>).mockImplementationOnce(() => ({
        healthcareOrganizationSlug: kebabCase(organizationName),
    }));

    addHealthcareOrganization(healthcareOrganizationDTO({ display_name: organizationName }));

    setupWithAppProviders(<HealthcareOrganization />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(organizationName);
});

test('healthcare provider shows a message if the provider could not be found', () => {
    const organizationName = faker.company.name();

    (useParams as MockedFunction<typeof useParams>).mockImplementationOnce(() => ({
        healthcareOrganizationSlug: kebabCase(organizationName),
    }));

    setupWithAppProviders(<HealthcareOrganization />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Zorgverlener was niet gevonden'
    );
});
