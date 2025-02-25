import { HealthCategory } from '$/healthCategory';
import { useOrganizationsStore, type Resource } from '$/store';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { test } from 'vitest';
import {
    HealthCategoryDetailList,
    type HealthCategoryDetailListProps,
} from './HealthCategoryDetailList';

function mockResource(label?: string): Resource {
    return {
        id: faker.string.uuid(),
        slug: faker.lorem.slug(),
        organizationId: faker.string.uuid(),
        dataServiceId: faker.number.int({ max: 60 }),
        label: label ?? faker.lorem.words(),
        mgoResource: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    };
}

test('shows HealthCategoryDetailList with organization', () => {
    const { addOrganization } = useOrganizationsStore.getState();
    const organization = addOrganization(faker.custom.healthcareOrganization());

    const label = faker.lorem.words();
    const props: HealthCategoryDetailListProps = {
        category: HealthCategory.PersonalInformation,
        heading: 'patient_information',
        resources: [
            {
                ...mockResource(label),
                organizationId: organization.id,
            },
        ],
    };

    setupWithAppProviders(<HealthCategoryDetailList {...props} />);
    screen.getByRole('link', {
        name: `${label} ${organization.name}`,
    });
});

test('shows HealthCategoryDetailList without organization', () => {
    const label = faker.lorem.words();
    const props: HealthCategoryDetailListProps = {
        category: HealthCategory.PersonalInformation,
        heading: 'patient_information',
        resources: [
            {
                ...mockResource(label),
            },
        ],
    };

    setupWithAppProviders(<HealthCategoryDetailList {...props} />);
    screen.getByRole('link', {
        name: `${label}`,
    });
});
