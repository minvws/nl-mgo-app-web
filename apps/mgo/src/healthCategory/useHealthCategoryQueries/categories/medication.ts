import { getCommonClinicalDatasetService, getGeneralPractitionerService } from '$/services';
import { type HealthcareOrganization } from '$/store';
import { type UseQueryOptions } from '@tanstack/react-query';
import { createResourceBundleQuery } from '../createResourceBundleQuery';
import { isNonNullish } from '$/utils';

export function getMedicationQueries(organization: HealthcareOrganization): UseQueryOptions[] {
    const commonClinicalDataset = getCommonClinicalDatasetService(organization);
    const generalPracticionerService = getGeneralPractitionerService(organization);

    return [
        createResourceBundleQuery({
            organization,
            service: commonClinicalDataset,
            method: 'getMedicationUse',
        }),
        createResourceBundleQuery({
            organization,
            service: commonClinicalDataset,
            method: 'getMedicationAgreements',
        }),
        createResourceBundleQuery({
            organization,
            service: commonClinicalDataset,
            method: 'getAdministrationAgreements',
        }),
        createResourceBundleQuery({
            organization,
            service: generalPracticionerService,
            method: 'getCurrentMedication',
        }),
    ].filter(isNonNullish);
}
