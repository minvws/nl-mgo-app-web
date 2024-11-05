import { getDataService } from '$/services';
import { type HealthcareOrganization } from '$/store';
import { isNonNullish } from '$/utils';
import { DataServiceId } from '@minvws/mgo-fhir-client';
import { type UseQueryOptions } from '@tanstack/react-query';
import { createResourceBundleQuery } from '../createResourceBundleQuery';

export function getVitalQueries(organization: HealthcareOrganization): UseQueryOptions[] {
    const commonClinicalDataset = getDataService(organization, DataServiceId.CommonClinicalDataset);

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
