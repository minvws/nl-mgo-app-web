import { useOrganizationsStore } from '$/store';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { test } from 'vitest';
import { HealthSubCategoryList, type HealthCategoryDetailListProps } from './HealthSubCategoryList';

test('shows HealthCategoryDetailList with organization', () => {
    const { addOrganization } = useOrganizationsStore.getState();
    const organization = addOrganization(faker.custom.healthcareOrganization());

    const label = faker.lorem.words();
    const props: HealthCategoryDetailListProps = {
        heading: 'patient_information',
        resources: [
            faker.custom.resource({
                summary: { label },
                organizationId: organization.id,
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
    const props: HealthCategoryDetailListProps = {
        heading: 'patient_information',
        resources: [faker.custom.resource({ summary: { label } })],
    };

    setupWithAppProviders(<HealthSubCategoryList {...props} />);
    screen.getByRole('link', {
        name: `${label}`,
    });
});
