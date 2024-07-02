import { screen } from '@testing-library/react';
import { type UserEvent } from '@testing-library/user-event';
import { type SearchFormData } from './SearchForm';
import { message } from '$test/helpers';

export const submitSearchForm = async (
    user: UserEvent,
    { name, city }: Partial<SearchFormData> = {}
) => {
    if (name) {
        const nameInput = screen.getByRole('textbox', { name: message('add_organization.name') });
        await user.type(nameInput, name);
    }

    if (city) {
        const cityInput = screen.getByRole('textbox', { name: message('add_organization.city') });
        await user.type(cityInput, city);
    }

    const submit = screen.getByRole('button', {
        name: message('common.search'),
    });
    await user.click(submit);
};
