import { getCommonClinicalDatasetService, getVaccinationsService } from '$/services';
import { type HealthcareOrganization } from '$/store';
import { type UseQueryOptions } from '@tanstack/react-query';
import { createResourceBundleQuery } from '../createResourceBundleQuery';
import { isNonNullish } from '$/utils';

export function getVaccinationQueries(organization: HealthcareOrganization): UseQueryOptions[] {
    const commonClinicalDataset = getCommonClinicalDatasetService(organization);
    const vaccinationsDataset = getVaccinationsService(organization);

    return [
        createResourceBundleQuery({
            organization,
            service: commonClinicalDataset,
            method: 'getVaccinations',
        }),
        createResourceBundleQuery({
            organization,
            service: vaccinationsDataset,
            method: 'getVaccinations',
        }),
    ].filter(isNonNullish);
}
