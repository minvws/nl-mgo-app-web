import { getDataService } from '$/services';
import { type HealthcareOrganization } from '$/store';
import { isNonNullish } from '$/utils';
import { DataServiceId } from '@minvws/mgo-fhir-client';
import { type UseQueryOptions } from '@tanstack/react-query';
import { createResourceBundleQuery } from '../createResourceBundleQuery';

export function getMedicationQueries(organization: HealthcareOrganization): UseQueryOptions[] {
    const commonClinicalDataset = getDataService(organization, DataServiceId.CommonClinicalDataset);
    const generalPracticionerService = getDataService(
        organization,
        DataServiceId.GeneralPractitioner
    );

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
