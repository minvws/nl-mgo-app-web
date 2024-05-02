import { expect, test } from 'vitest';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { Record } from './Record';

test('renders with with label and description', async () => {
    const label = faker.lorem.sentence();
    const description = faker.lorem.sentence();

    render(
        <Record>
            <Record.Label data-testid="label">{label}</Record.Label>
            <Record.Description data-testid="description">{description}</Record.Description>
        </Record>
    );

    expect(screen.getByTestId('label').textContent).toContain(label);
    expect(screen.getByTestId('description').textContent).toContain(description);
});

test('renders with with label and date', async () => {
    const label = faker.lorem.sentence();
    const date = faker.date.anytime().toLocaleDateString();

    render(
        <Record>
            <Record.Label data-testid="label">{label}</Record.Label>
            <Record.Date data-testid="date" value={date} />
        </Record>
    );

    expect(screen.getByTestId('label').textContent).toContain(label);
    expect(screen.getByTestId('date').textContent).toContain(date);
});
