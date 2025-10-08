import { getHealthCategoryConfigs } from '$/config';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { appMessageRegexp, AppMessagesIds } from '@minvws/mgo-intl/test/shared';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { HealthCategoryList } from './HealthCategoryList';

test('HealthCategoryList with organization filter', () => {
    const organization = faker.custom.healthcareOrganization();
    setupWithAppProviders(<HealthCategoryList organization={organization} />);

    const categoryConfigs = getHealthCategoryConfigs();

    Object.values(categoryConfigs).forEach((category) => {
        const name = appMessageRegexp(category.heading as AppMessagesIds);
        expect(
            screen.getByRole('link', {
                name: name,
            })
        ).toBeInTheDocument();
    });
});

test('HealthCategoryList without organization filter', () => {
    setupWithAppProviders(<HealthCategoryList />);

    const categoryConfigs = getHealthCategoryConfigs();

    Object.values(categoryConfigs).forEach((category) => {
        const name = appMessageRegexp(category.heading as AppMessagesIds);
        expect(
            screen.getByRole('link', {
                name: name,
            })
        ).toBeInTheDocument();
    });
});
