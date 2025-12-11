import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { HealthCategoryButton } from './HealthCategoryButton';

test('render', async () => {
    const text = faker.lorem.word();
    render(<HealthCategoryButton icon="allergy" title={text} subtitle={faker.lorem.word()} />);

    const element = screen.getByText(text);
    expect(element).toBeVisible();
});

test('render loading state', async () => {
    render(
        <HealthCategoryButton
            loading
            icon="allergy"
            title={faker.lorem.word()}
            subtitle={faker.lorem.word()}
        />
    );

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeVisible();
});

test('render with status', async () => {
    const label = faker.lorem.word();
    render(
        <HealthCategoryButton
            icon="allergy"
            statusLabel={label}
            title={faker.lorem.word()}
            subtitle={faker.lorem.word()}
        />
    );

    const element = screen.getByText(label);
    expect(element).toBeVisible();
});
