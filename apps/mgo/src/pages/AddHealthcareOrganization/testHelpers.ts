import { screen } from '@testing-library/react';
import { type UserEvent } from '@testing-library/user-event';
import { type SearchFormData } from './SearchForm';

export const submitSearchForm = async (
    user: UserEvent,
    { name, city }: Partial<SearchFormData> = {}
) => {
    if (name) {
        const nameInput = screen.getByRole('textbox', { name: 'Naam' });
        await user.type(nameInput, name);
    }

    if (city) {
        const cityInput = screen.getByRole('textbox', { name: 'Plaats' });
        await user.type(cityInput, city!);
    }

    const submit = screen.getByRole('button', {
        name: 'Zoeken',
    });
    await user.click(submit);
};
