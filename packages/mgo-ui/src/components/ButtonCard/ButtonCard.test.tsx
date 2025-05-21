import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { ButtonCard, type ButtonCardProps } from './ButtonCard';

test('renders ButtonCard', async () => {
    const props: ButtonCardProps = {
        title: faker.word.sample(),
        description: faker.word.sample(),
    };

    render(<ButtonCard {...props} />);

    const element = await screen.findByRole('button');
    expect(element).toBeVisible();
});

test('renders ButtonCard in loading state', async () => {
    const props: ButtonCardProps = {
        isLoading: true,
    };

    render(<ButtonCard {...props} />);

    const element = await screen.findByRole('button');
    expect(element).toBeVisible();
});
