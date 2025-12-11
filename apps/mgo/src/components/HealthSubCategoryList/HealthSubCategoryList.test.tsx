import { useStore } from '$/store';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { test, vi } from 'vitest';
import { HealthSubCategoryList, type HealthCategoryDetailListProps } from './HealthSubCategoryList';

const hoisted = vi.hoisted(() => ({
    getSummary: vi.fn(),
}));

vi.mock('$/hooks', () => ({
    useHealthUiSchema: vi.fn(() => ({
        getSummary: hoisted.getSummary,
    })),
}));

test('shows HealthCategoryDetailList with organization', () => {
    const { addOrganization } = useStore.getState();
    const organization = addOrganization(faker.custom.healthcareOrganization());

    const label = faker.lorem.words();
    hoisted.getSummary.mockReturnValue({ label, children: [] });

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
        name: `${label} ${organization.name}`,
    });
});

test('shows HealthCategoryDetailList without organization', () => {
    const label = faker.lorem.words();
    hoisted.getSummary.mockReturnValue({ label, children: [] });

    const props: HealthCategoryDetailListProps = {
        heading: 'hc_problems.heading',
        resources: [faker.custom.resource()],
    };

    setupWithAppProviders(<HealthSubCategoryList {...props} />);
    screen.getByRole('link', {
        name: `${label}`,
    });
});
