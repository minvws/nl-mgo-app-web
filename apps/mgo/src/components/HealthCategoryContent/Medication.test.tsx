import { type HealthCategory } from '$/healthCategory';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { messageRegexp } from '$test/helpers/i18n';
import { screen } from '@testing-library/react';
import { test, vi } from 'vitest';
import { Medication } from './Medication';
import { type CategoryContentProps } from './HealthCategoryContent';
import { useOrganizationsStore } from '$/store';

test('shows a list of resources', async () => {
    const store = useOrganizationsStore.getState();
    const mock = vi.spyOn(store, 'getOrganizationById');
    const organization = faker.custom.healthcareOrganization();
    mock.mockImplementation(() => organization);

    const props: CategoryContentProps<HealthCategory.Medication> = {
        data: {
            medicationUse: [
                {
                    id: faker.string.uuid(),
                    slug: faker.lorem.slug(),
                    organizationId: faker.string.uuid(),
                    dataServiceId: faker.number.int({ max: 60 }),
                    uiSchema: {
                        label: faker.lorem.words(),
                        children: [],
                    },
                    mgoResource: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
                },
            ],
            medicationAgreements: [],
            administrationAgreements: [],
        },
    };

    setupWithAppProviders(<Medication {...props} />);

    screen.getByRole('heading', {
        name: messageRegexp('health_category.medication.medication_use'),
        level: 2,
    });

    screen.getByRole('link', {
        name: `${props.data.medicationUse[0].uiSchema.label} ${organization.name}`,
    });
});
