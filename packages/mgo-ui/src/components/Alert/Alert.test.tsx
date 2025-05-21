import { expect, test } from 'vitest';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { Alert } from './Alert';
import { statuses } from './statuses';

test('renders an alert with a description', async () => {
    const props = {
        label: faker.lorem.sentence(),
        status: faker.helpers.arrayElement(statuses),
        'aria-label': faker.word.sample(),
    };

    const description = faker.lorem.sentence();

    render(<Alert {...props}>{description}</Alert>);

    expect(screen.getByRole('alert')).toHaveTextContent(description);
});

test('renders an alert without a description', async () => {
    const props = {
        label: faker.lorem.sentence(),
        status: faker.helpers.arrayElement(statuses),
        'aria-label': faker.word.sample(),
    };

    render(<Alert {...props} />);

    expect(screen.getByRole('alert')).toHaveTextContent(props.label);
});
