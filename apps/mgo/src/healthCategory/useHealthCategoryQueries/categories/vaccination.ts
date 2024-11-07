import { getDataService } from '$/services';
import { type HealthcareOrganization } from '$/store';
import { isNonNullish } from '$/utils';
import { DataServiceId } from '@minvws/mgo-fhir-client';
import { type UseQueryOptions } from '@tanstack/react-query';
import { createResourceBundleQuery } from '../createResourceBundleQuery';

export function getVaccinationQueries(organization: HealthcareOrganization): UseQueryOptions[] {
    const commonClinicalDataset = getDataService(organization, DataServiceId.CommonClinicalDataset);
    const vaccinationsDataset = getDataService(organization, DataServiceId.Vaccinations);

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
        createResourceBundleQuery({
            organization,
            service: commonClinicalDataset,
            method: 'getPlannedImmunizations',
        }),
    ].filter(isNonNullish);
}
