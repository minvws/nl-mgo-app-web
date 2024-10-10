import { HealthCategory } from '$/healthCategory';
import { type HealthCategoryData } from '$/healthCategory/useHealthCategoryData/useHealthCategoryData';
import { type Resource, useOrganizationsStore } from '$/store';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { test, vi } from 'vitest';
import { HealthCategoryContent, type HealthCategoryContentProps } from './HealthCategoryContent';

test.each([
    [HealthCategory.PersonalInformation, ['patientInformation']],
    [HealthCategory.PayerAndOrganization, ['getInsuranceInformation']],
    [HealthCategory.TreatmentPlan, ['getTreatmentDirectives', 'getAdvanceDirectives']],
    [HealthCategory.FunctionalOrMentalStatus, ['functionalOrMentalStatus']],
    [HealthCategory.Problems, ['problems']],
    [
        HealthCategory.Lifestyle,
        ['currentLivingSituation', 'drugUse', 'alchoholuse', 'tabaccoUse', 'nutritionAdvice'],
    ],
    [HealthCategory.Warning, ['warnings']],
    [HealthCategory.AllergiesAndIntolerances, ['allergies']],
    [HealthCategory.MedicalDevices, ['medicalDevices', 'medicalDeviceProducts']],
    [HealthCategory.Vaccinations, ['vaccinations']],
])('shows a list of resources for: %s', (category, keys) => {
    const store = useOrganizationsStore.getState();
    const mock = vi.spyOn(store, 'getOrganizationById');
    const organization = faker.custom.healthcareOrganization();
    mock.mockImplementation(() => organization);

    const props: HealthCategoryContentProps<typeof category> = {
        category,
        data: keys.reduce(
            (acc, key) => {
                acc[key] = [
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
                ];
                return acc;
            },
            {} as Record<string, HealthCategoryData<typeof category>>
        ),
    };

    setupWithAppProviders(<HealthCategoryContent {...props} />);

    const resources = props.data[
        keys[0] as keyof HealthCategoryData<typeof category>
    ] as Resource[];

    screen.getByRole('link', {
        name: `${resources[0].uiSchema.label} ${organization.name}`,
    });
});
