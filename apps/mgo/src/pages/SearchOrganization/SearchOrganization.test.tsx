import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-intl/test/shared';
import { screen } from '@testing-library/react';
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
