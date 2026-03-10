import { expect, test } from 'vitest';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { DetailButton, type DetailButtonProps } from './DetailButton';

test('renders a button with a label', async () => {
    const props: DetailButtonProps = {
        title: faker.lorem.sentence(),
        description: faker.lorem.sentence(),
    };

    render(<DetailButton {...props} />);

    expect(screen.getByRole('button')).toHaveTextContent(props.title as string);
    expect(screen.getByRole('button')).toHaveTextContent(props.description as string);
});

test('renders with a detail field if specified', async () => {
    const props: DetailButtonProps = {
        title: faker.lorem.sentence(),
        description: faker.lorem.sentence(),
        detail: faker.lorem.sentence(),
    };

    render(<DetailButton {...props} />);

    expect(screen.getByRole('button')).toHaveTextContent(props.detail as string);
});

test('renders with a detail icon', async () => {
    const props: DetailButtonProps = {
        title: faker.lorem.sentence(),
        description: faker.lorem.sentence(),
        descriptionIcon: 'medical_information',
        detail: faker.lorem.sentence(),
    };

    render(<DetailButton {...props} />);

    expect(screen.getByTestId('icon:medical_information')).toBeVisible();
});
