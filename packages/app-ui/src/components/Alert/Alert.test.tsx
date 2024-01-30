import { expect, test, describe } from 'vitest';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { statuses, Alert } from './Alert';

test('renders an alert with a description', async () => {
    const props = {
        label: faker.lorem.sentence(),
        description: faker.lorem.sentence(),
        status: faker.helpers.arrayElement(statuses),
    };

    render(<Alert {...props} />);

    expect(screen.getByRole('alert')).toHaveTextContent(props.description);
});

test('renders an alert without a description', async () => {
    const props = {
        label: faker.lorem.sentence(),
        status: faker.helpers.arrayElement(statuses),
    };

    render(<Alert {...props} />);

    expect(screen.getByRole('alert')).toHaveTextContent(props.label);
});
