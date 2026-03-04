import { useStore } from '$/store';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { test, vi } from 'vitest';
import { HealthSubCategoryList, type HealthCategoryDetailListProps } from './HealthSubCategoryList';

const hoisted = vi.hoisted(() => ({
    getCard: vi.fn(),
}));

vi.mock('$/hooks', () => ({
    useHcim: vi.fn(() => ({
        getCard: hoisted.getCard,
    })),
}));

test('shows HealthCategoryDetailList with organization', () => {
    const organization = faker.custom.healthcareOrganization();
    useStore.setState({ organizations: [organization] });
    const title = faker.lorem.words();
    hoisted.getCard.mockReturnValue({ title, description: organization.name });

    const props: HealthCategoryDetailListProps = {
        heading: 'hc_problems.heading',
        resources: [
            faker.custom.resource({
                source: { organizationId: organization.id },
            }),
        ],
    };

    setupWithAppProviders(<HealthSubCategoryList {...props} />);
    screen.getByRole('link', {
        name: `${title} ${organization.name}`,
    });
});

test('shows HealthCategoryDetailList without organization', () => {
    const title = faker.lorem.words();
    hoisted.getCard.mockReturnValue({ title });

    const props: HealthCategoryDetailListProps = {
        heading: 'hc_problems.heading',
        resources: [faker.custom.resource()],
    };

    setupWithAppProviders(<HealthSubCategoryList {...props} />);
    screen.getByRole('link', {
        name: `${title}`,
    });
});
