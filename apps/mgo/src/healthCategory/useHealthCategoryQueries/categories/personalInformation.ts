import { getDataService } from '$/services';
import { type HealthcareOrganization } from '$/store';
import { isNonNullish } from '$/utils';
import { DataServiceId } from '@minvws/mgo-fhir-client';
import { type UseQueryOptions } from '@tanstack/react-query';
import { createResourceBundleQuery } from '../createResourceBundleQuery';

export function getPersonalInformationQueries(
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
            method: 'getPatientInformation',
        }),
        createResourceBundleQuery({
            organization,
            service: generalPracticionerService,
            method: 'getPatient',
        }),
    ].filter(isNonNullish);
}
