import { setupWithAppProviders } from '$test/helpers';
import { expect, test } from 'vitest';
import { HealthCategoryList } from './HealthCategoryList';
import { faker } from '$test/faker';
import { screen } from '@testing-library/react';
import { HealthCategory } from '$/healthCategory';
import { messageRegexp } from '$test/helpers/i18n';

test('HealthCategoryList with organization', () => {
    const organization = faker.custom.healthcareOrganization();
    setupWithAppProviders(<HealthCategoryList organization={organization} />);

    Object.values(HealthCategory).forEach((category) => {
        const name = messageRegexp(`hc_${category}.heading`);
        expect(
            screen.getByRole('link', {
                name: name,
            })
        ).toBeInTheDocument();
    });
});

test('HealthCategoryList without organization', () => {
    setupWithAppProviders(<HealthCategoryList />);

    Object.values(HealthCategory).forEach((category) => {
        const name = messageRegexp(`hc_${category}.heading`);
        expect(
            screen.getByRole('link', {
                name: name,
            })
        ).toBeInTheDocument();
    });
});
