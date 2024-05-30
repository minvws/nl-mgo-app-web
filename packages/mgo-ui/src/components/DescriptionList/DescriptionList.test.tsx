import { expect, test } from 'vitest';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { DescriptionList } from './DescriptionList';

test('renders with with term and details as children', async () => {
    const label = faker.lorem.sentence();
    const description = faker.lorem.sentence();

    render(
        <DescriptionList>
            <DescriptionList.Term>{label}</DescriptionList.Term>
            <DescriptionList.Details>{description}</DescriptionList.Details>
        </DescriptionList>
    );

    expect(screen.getByRole('term').textContent).toBe(label);
    expect(screen.getByRole('definition').textContent).toBe(description);
});

test('renders with with term and details as list', async () => {
    const label = faker.lorem.sentence();
    const description = faker.lorem.sentence();

    render(
        <DescriptionList
            list={[
                {
                    term: label,
                    details: description,
                },
            ]}
        />
    );

    expect(screen.getByRole('term').textContent).toBe(label);
    expect(screen.getByRole('definition').textContent).toBe(description);
});

test('renders with with details with a dash if undefined', async () => {
    const label = faker.lorem.sentence();

    render(
        <DescriptionList
            list={[
                {
                    term: label,
                    details: undefined,
                },
            ]}
        />
    );

    expect(screen.getByRole('term').textContent).toBe(label);
    expect(screen.getByRole('definition').textContent).toBe('-');
});
