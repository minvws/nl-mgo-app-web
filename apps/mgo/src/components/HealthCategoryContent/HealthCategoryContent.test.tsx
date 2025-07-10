import { type SubCategoryData } from '$/healthCategory/useHealthCategoryData/categories';
import { type HealthCategoryData } from '$/healthCategory/useHealthCategoryData/useHealthCategoryData';
import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-intl/test';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { HealthCategoryContent } from './HealthCategoryContent';

test('show HealthCategoryContent for category', () => {
    const props = {
        data: {
            patientInformation: {
                label: 'health_category.patient.patient_information',
                data: [],
            },
            practitionerInformation: {
                label: 'health_category.patient.practitioner_information',
                data: [],
            },
        } satisfies Record<string, SubCategoryData>,
    };

    setupWithAppProviders(<HealthCategoryContent {...props} />);
    const heading = screen.getByRole('heading', {
        level: 2,
        name: appMessage(`health_category.patient.patient_information`),
    });
    expect(heading).toBeVisible();
});

test('HealthCategoryContent should be empty when no data is supplied', () => {
    setupWithAppProviders(<HealthCategoryContent data={{} as HealthCategoryData} />);

    expect(screen.queryByRole('link')).toBeNull();
});
