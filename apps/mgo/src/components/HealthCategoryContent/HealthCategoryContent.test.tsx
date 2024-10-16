import { HealthCategory } from '$/healthCategory';
import { setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { HealthCategoryContent } from './HealthCategoryContent';

test('show HealthCategoryContent for category', () => {
    const props = {
        category: HealthCategory.PersonalInformation,
        data: {
            patientInformation: [],
        },
    };

    setupWithAppProviders(<HealthCategoryContent {...props} />);
    const heading = screen.getByRole('heading', {
        level: 2,
        name: `health_category.patient.patient_information`,
    });
    expect(heading).toBeVisible();
});

test('HealthCategoryContent should be empty when empty category is giving', () => {
    setupWithAppProviders(<HealthCategoryContent category={'test' as HealthCategory} data={[]} />);

    expect(screen.queryByRole('link')).toBeNull();
});
