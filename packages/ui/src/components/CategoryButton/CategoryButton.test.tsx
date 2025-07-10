import { faker } from '@faker-js/faker';
import { render, screen, within } from '@testing-library/react';
import { expect, test } from 'vitest';
import { CategoryButton } from './CategoryButton';

test('render', async () => {
    const text = faker.lorem.word();
    render(<CategoryButton icon="allergy">{text}</CategoryButton>);

    const element = screen.getByRole('button', {
        name: text,
    });
    expect(element).toBeVisible();
});

test('render loading state', async () => {
    const text = faker.lorem.word();
    const loaderText = faker.lorem.word();
    render(
        <CategoryButton isLoading loadingText={loaderText}>
            {text}
        </CategoryButton>
    );

    const element = screen.getByRole('button');
    const spinner = within(element).getByTestId('spinner');
    expect(spinner).toBeVisible();
});

test('render with subLabel', async () => {
    const text = faker.lorem.word();
    const label = faker.lorem.word();
    render(<CategoryButton label={label}>{text}</CategoryButton>);

    const element = screen.getByRole('button');
    const icon = within(element).queryByRole('img');
    expect(icon).toBeNull();
    expect(element).toContainHTML(label);
});
