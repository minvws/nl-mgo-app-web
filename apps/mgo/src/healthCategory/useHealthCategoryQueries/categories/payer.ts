import { getCommonClinicalDatasetService } from '$/services';
import { type HealthcareOrganization } from '$/store';
import { type UseQueryOptions } from '@tanstack/react-query';
import { createResourceBundleQuery } from '../createResourceBundleQuery';
import { isNonNullish } from '$/utils';

export function getPayerQueries(organization: HealthcareOrganization): UseQueryOptions[] {
    const commonClinicalDataset = getCommonClinicalDatasetService(organization);
    return [
        createResourceBundleQuery({
            organization,
            service: commonClinicalDataset,
            method: 'getInsuranceInformation',
        }),
    ].filter(isNonNullish);
}
