import { faker } from '@faker-js/faker';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { SearchForm } from './SearchForm';

test('pressing Escape clears the input (calls onChange with empty string)', async () => {
    const handleChange = vi.fn();
    render(<SearchForm clearAriaLabel="Clear" value="initial value" onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    input.focus();

    await userEvent.keyboard('{Escape}');

    expect(handleChange).toHaveBeenCalledWith('');
});

test('typing in the input calls onChange with the new value', async () => {
    const handleChange = vi.fn();
    render(<SearchForm clearAriaLabel="Clear" value="" onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    const value = faker.string.alphanumeric(1);
    await userEvent.type(input, value);

    expect(handleChange).toHaveBeenLastCalledWith(value);
});

test('submitting the form calls onSubmit with current value and prevents default', async () => {
    const handleSubmit = vi.fn();
    const query = faker.lorem.word();
    render(
        <SearchForm
            clearAriaLabel="Clear"
            value={query}
            onChange={vi.fn()}
            onSubmit={handleSubmit}
        />
    );

    const input = screen.getByRole('textbox');
    const form = input.closest('form')!;

    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    fireEvent(form, submitEvent);

    expect(handleSubmit).toHaveBeenCalledWith(query);
});
