import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-intl/test/shared';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import { SearchOrganization } from './SearchOrganization';

test('shows the heading', async () => {
    setupWithAppProviders(<SearchOrganization />);

    expect(
        screen.getByRole('heading', {
            level: 1,
        })
    ).toHaveTextContent(appMessage('add_organization.heading'));
});

test('shows NoResults after entering a non-matching search query', async () => {
    const user = userEvent.setup();
    setupWithAppProviders(<SearchOrganization />);

    const input = screen.getByPlaceholderText(
        appMessage('add_organization.search_placeholder')
    ) as HTMLInputElement;

    await user.type(input, 'some random query');

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
        appMessage('organization_search.no_results_found_heading')
    );
});
