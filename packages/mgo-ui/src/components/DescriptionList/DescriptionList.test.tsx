import { expect, test } from 'vitest';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { DescriptionList } from './DescriptionList';
import { DescriptionCard } from '../DescriptionCard/DescriptionCard';

test('renders with with term and details as children', async () => {
    const label = faker.lorem.sentence();
    const description = faker.lorem.sentence();

    render(
        <DescriptionList>
            <DescriptionCard term={label} details={description} />
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
