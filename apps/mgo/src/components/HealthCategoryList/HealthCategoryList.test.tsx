import { HealthCategory } from '$/healthCategory';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { appMessageRegexp } from '@minvws/mgo-intl/test';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { HealthCategoryList } from './HealthCategoryList';

test('HealthCategoryList with organization filter', () => {
    const organization = faker.custom.healthcareOrganization();
    setupWithAppProviders(<HealthCategoryList organization={organization} />);

    Object.values(HealthCategory).forEach((category) => {
        const name = appMessageRegexp(`hc_${category}.heading`);
        expect(
            screen.getByRole('link', {
                name: name,
            })
        ).toBeInTheDocument();
    });
});

test('HealthCategoryList without organization filter', () => {
    setupWithAppProviders(<HealthCategoryList />);

    Object.values(HealthCategory).forEach((category) => {
        const name = appMessageRegexp(`hc_${category}.heading`);
        expect(
            screen.getByRole('link', {
                name: name,
            })
        ).toBeInTheDocument();
    });
});
