import { getCommonClinicalDatasetService } from '$/services';
import { type HealthcareOrganization } from '$/store';
import { type UseQueryOptions } from '@tanstack/react-query';
import { createResourceBundleQuery } from '../createResourceBundleQuery';
import { isNonNullish } from '$/utils';

export function getTreatmentPlanQueries(organization: HealthcareOrganization): UseQueryOptions[] {
    const commonClinicalDataset = getCommonClinicalDatasetService(organization);
    return [
        createResourceBundleQuery({
            organization,
            service: commonClinicalDataset,
            method: 'getTreatmentDirectives',
        }),
        createResourceBundleQuery({
            organization,
            service: commonClinicalDataset,
            method: 'getAdvanceDirectives',
        }),
    ].filter(isNonNullish);
}
