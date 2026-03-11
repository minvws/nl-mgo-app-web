import { expect, test } from 'vitest';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { CardButton, type CardButtonProps } from './CardButton';

test('renders a button with a label', async () => {
    const props: CardButtonProps = {
        title: faker.lorem.sentence(),
        description: faker.lorem.sentence(),
    };

    render(<CardButton {...props} />);

    expect(screen.getByRole('button')).toHaveTextContent(props.title as string);
    expect(screen.getByRole('button')).toHaveTextContent(props.description as string);
});

test('renders with a detail field if specified', async () => {
    const props: CardButtonProps = {
        title: faker.lorem.sentence(),
        description: faker.lorem.sentence(),
        detail: faker.lorem.sentence(),
    };

    render(<CardButton {...props} />);

    expect(screen.getByRole('button')).toHaveTextContent(props.detail as string);
});

test('renders with a detail icon', async () => {
    const props: CardButtonProps = {
        title: faker.lorem.sentence(),
        description: faker.lorem.sentence(),
        descriptionIcon: 'medical_information',
        detail: faker.lorem.sentence(),
    };

    render(<CardButton {...props} />);

    expect(screen.getByTestId('icon:medical_information')).toBeVisible();
});
