import { getDataService } from '$/services';
import { type HealthcareOrganization } from '$/store';
import { type UseQueryOptions } from '@tanstack/react-query';
import { createResourceBundleQuery } from '../createResourceBundleQuery';
import { isNonNullish } from '$/utils';
import { DataServiceId } from '@minvws/mgo-fhir-client';

export function getMedicalDevicesQueries(organization: HealthcareOrganization): UseQueryOptions[] {
    const commonClinicalDataset = getDataService(organization, DataServiceId.CommonClinicalDataset);
    return [
        createResourceBundleQuery({
            organization,
            service: commonClinicalDataset,
            method: 'getMedicalAids',
        }),
        createResourceBundleQuery({
            organization,
            service: commonClinicalDataset,
            method: 'getPlannedMedicalDevices',
        }),
    ].filter(isNonNullish);
}
