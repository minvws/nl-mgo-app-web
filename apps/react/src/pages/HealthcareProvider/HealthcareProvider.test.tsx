/* eslint-disable @typescript-eslint/consistent-type-imports */

import { useParams } from '$/routing';
import { useHealthcareProvidersStore } from '$/store';
import { renderWithAppProviders } from '$test/renderApp';
import { faker } from '@faker-js/faker';
import { screen } from '@testing-library/react';
import { kebabCase } from 'lodash';
import { MockedFunction, expect, test, vi } from 'vitest';
import { HealthcareProvider } from './HealthcareProvider';

vi.mock(
    '$/routing/useParams',
    () =>
        ({
            useParams: vi.fn(),
        }) as typeof import('$/routing/useParams')
);

test('healthcare provider shows details about the provider', () => {
    const organisationName = faker.company.name();

    (useParams as MockedFunction<typeof useParams>).mockImplementationOnce(() => ({
        healthcareProviderSlug: kebabCase(organisationName),
    }));

    const { addHealthcareProvider } = useHealthcareProvidersStore.getState();

    addHealthcareProvider({
        organisation: {
            display_name: organisationName,
            id_type: 'abg-z',
            id_value: '01008656',
            addresses: [],
        },
        service: {
            medmij_id: 'huisartsenpuntdierdonk.huisartspraktijk.dierdonk@medmij',
            organisation_type: 'ZA',
            id_type: 'abg-z',
            id_value: '01008656',
            dataservices: [],
        },
    });

    renderWithAppProviders(<HealthcareProvider />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(organisationName);
});

test('healthcare provider shows a message if the provider could not be found', () => {
    const organisationName = faker.company.name();

    (useParams as MockedFunction<typeof useParams>).mockImplementationOnce(() => ({
        healthcareProviderSlug: kebabCase(organisationName),
    }));

    renderWithAppProviders(<HealthcareProvider />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Zorgverlener was niet gevonden'
    );
});
