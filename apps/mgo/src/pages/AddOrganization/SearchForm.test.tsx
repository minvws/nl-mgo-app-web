import { message, setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { SearchForm } from './SearchForm';
import { submitSearchForm } from './testHelpers';

test('Form shows error when submitting empty', async () => {
    const { user } = setupWithAppProviders(<SearchForm onSubmit={() => {}} />);

    submitSearchForm(user, { name: ' ', city: '' });

    expect(await screen.findByText(message('add_organization.error_missing_name'))).toBeVisible();
    expect(await screen.findByText(message('add_organization.error_missing_city'))).toBeVisible();
});
