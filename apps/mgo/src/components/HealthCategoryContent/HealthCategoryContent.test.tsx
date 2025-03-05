import { HealthCategory } from '$/healthCategory';
import { setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { HealthCategoryContent } from './HealthCategoryContent';
import { type HealthCategoryData } from '$/healthCategory/useHealthCategoryData/useHealthCategoryData';

test('show HealthCategoryContent for category', () => {
    const props = {
        category: HealthCategory.PersonalInformation,
        data: {
            patientInformation: [],
            practitionerInformation: [],
        },
    };

    setupWithAppProviders(<HealthCategoryContent {...props} />);
    const heading = screen.getByRole('heading', {
        level: 2,
        name: `health_category.patient.patient_information`,
    });
    expect(heading).toBeVisible();
});

test('HealthCategoryContent should be empty when no data is supplied', () => {
    setupWithAppProviders(
        <HealthCategoryContent
            category={'test' as HealthCategory}
            data={{} as HealthCategoryData}
        />
    );

    expect(screen.queryByRole('link')).toBeNull();
});
