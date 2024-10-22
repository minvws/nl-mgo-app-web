import { getCommonClinicalDatasetService } from '$/services';
import { type HealthcareOrganization } from '$/store';
import { type UseQueryOptions } from '@tanstack/react-query';
import { createResourceBundleQuery } from '../createResourceBundleQuery';
import { isNonNullish } from '$/utils';

export function getVitalQueries(organization: HealthcareOrganization): UseQueryOptions[] {
    const commonClinicalDataset = getCommonClinicalDatasetService(organization);

    return [
        createResourceBundleQuery({
            organization,
            service: commonClinicalDataset,
            method: 'getLastBloodPressure',
        }),
        createResourceBundleQuery({
            organization,
            service: commonClinicalDataset,
            method: 'getLastBodyWeight',
        }),
        createResourceBundleQuery({
            organization,
            service: commonClinicalDataset,
            method: 'getLastBodyHeight',
        }),
    ].filter(isNonNullish);
}
