import { expect, test } from 'vitest';
import { setupWithAppProviders } from '$test/helpers';
import { RESULTS_PER_PAGE, SearchResults } from './SearchResults';
import { faker } from '@faker-js/faker';
import { type HealthcareOrganisation } from '$/types/Organisation';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('Test pagination', async () => {
    const data: HealthcareOrganisation[] = [];
    for (let index = 0; index < RESULTS_PER_PAGE + 1; index++) {
        data.push({
            display_name: faker.word.sample(),
            identification_type: faker.word.sample(),
            identification_value: faker.string.uuid(),
            active: true,
            addresses: [
                {
                    active: true,
                    address: faker.word.sample(),
                    city: faker.word.sample(),
                    country: faker.word.sample(),
                    lines: [faker.word.sample()],
                    postalcode: faker.word.sample(),
                    state: undefined,
                    type: 'postal',
                },
            ],
            names: [],
            types: [
                {
                    code: '01',
                    display_name: 'Apothekers',
                    type: 'http://www.vzvz.nl/fhir/NamingSystem/vektis-zorgsoort',
                },
            ],
        });
    }

    const user = userEvent.setup();
    setupWithAppProviders(<SearchResults results={data} />);

    expect(await screen.getAllByRole('listitem').length).toBe(15);

    const button = await screen.getByRole('button', {
        name: 'Meer zorgverleners laden',
    });
    expect(button).toBeVisible();
    await user.click(button);

    expect(await screen.getAllByRole('listitem').length).toBeGreaterThan(15);
    expect(
        await screen.queryByRole('button', {
            name: 'Meer zorgverleners laden',
        })
    ).not.toBeInTheDocument();
});
