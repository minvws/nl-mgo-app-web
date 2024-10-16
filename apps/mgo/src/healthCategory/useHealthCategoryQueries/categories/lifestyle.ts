import { getCommonClinicalDatasetService } from '$/services';
import { type HealthcareOrganization } from '$/store';
import { type UseQueryOptions } from '@tanstack/react-query';
import { createResourceBundleQuery } from '../createResourceBundleQuery';
import { isNonNullish } from '$/utils';

export function getLifestyleQueries(organization: HealthcareOrganization): UseQueryOptions[] {
    const commonClinicalDataset = getCommonClinicalDatasetService(organization);
    return [
        createResourceBundleQuery({
            organization,
            service: commonClinicalDataset,
            method: 'getCurrentLivingSituation',
        }),
        createResourceBundleQuery({
            organization,
            service: commonClinicalDataset,
            method: 'getDrugUse',
        }),
        createResourceBundleQuery({
            organization,
            service: commonClinicalDataset,
            method: 'getAlcoholUse',
        }),
        createResourceBundleQuery({
            organization,
            service: commonClinicalDataset,
            method: 'getTobaccoUse',
        }),
        createResourceBundleQuery({
            organization,
            service: commonClinicalDataset,
            method: 'getDietaryRecommendations',
        }),
    ].filter(isNonNullish);
}
