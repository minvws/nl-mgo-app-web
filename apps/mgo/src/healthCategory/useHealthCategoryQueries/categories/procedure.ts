import { getDataService } from '$/services';
import { type HealthcareOrganization } from '$/store';
import { isNonNullish } from '$/utils';
import { DataServiceId } from '@minvws/mgo-fhir-client';
import { type UseQueryOptions } from '@tanstack/react-query';
import { createResourceBundleQuery } from '../createResourceBundleQuery';

export function getProcedureQueries(organization: HealthcareOrganization): UseQueryOptions[] {
    const commonClinicalDataset = getDataService(organization, DataServiceId.CommonClinicalDataset);

    return [
        createResourceBundleQuery({
            organization,
            service: commonClinicalDataset,
            method: 'getSurgicalProcedures',
        }),
        createResourceBundleQuery({
            organization,
            service: commonClinicalDataset,
            method: 'getPlannedProcedures',
        }),
    ].filter(isNonNullish);
}
