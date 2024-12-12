import { getDataService } from '$/services';
import { type HealthcareOrganization } from '$/store';
import { type UseQueryOptions } from '@tanstack/react-query';
import { createResourceBundleQuery } from '../createResourceBundleQuery';
import { isNonNullish } from '$/utils';
import { DataServiceId } from '@minvws/mgo-fhir-client';

export function getLaboratoryResultQueries(
    organization: HealthcareOrganization
): UseQueryOptions[] {
    const commonClinicalDataset = getDataService(organization, DataServiceId.CommonClinicalDataset);
    const generalPracticionerService = getDataService(
        organization,
        DataServiceId.GeneralPractitioner
    );

    return [
        createResourceBundleQuery({
            organization,
            service: commonClinicalDataset,
            method: 'getLastLaboratoryResultsPerType',
        }),
        createResourceBundleQuery({
            organization,
            service: generalPracticionerService,
            method: 'getDiagnosticAndLabResults',
        }),
    ].filter(isNonNullish);
}
