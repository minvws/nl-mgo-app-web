import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-intl/test/shared';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { SearchForm } from './SearchForm';
import { submitSearchForm } from './testHelpers';

test('Form shows error when submitting empty', async () => {
    const { user } = setupWithAppProviders(<SearchForm onSubmit={() => {}} />);

    submitSearchForm(user, { name: ' ', city: '' });

    expect(
        await screen.findByText(appMessage('add_organization.error_missing_name'))
    ).toBeVisible();
    expect(
        await screen.findByText(appMessage('add_organization.error_missing_city'))
    ).toBeVisible();
});
