import { HealthCategory } from '$/healthCategory/HealthCategory';
import { getDataService } from '$/services';
import { type HealthcareOrganization } from '$/store';
import { DataServiceId } from '@minvws/mgo-data-services';
import { isNonNullish } from '@minvws/mgo-utils';
import { type CategoryQueriesConfig } from '.';
import { createResourceBundleQuery } from '../createResourceBundleQuery';

const category = HealthCategory.Vaccinations;

export const vaccinations: CategoryQueriesConfig<typeof category> = {
    category,
    getQueries: (organization: HealthcareOrganization) => {
        const commonClinicalDataset = getDataService(
            organization,
            DataServiceId.CommonClinicalDataset
        );
        const vaccinationImmunization = getDataService(
            organization,
            DataServiceId.VaccinationImmunization
        );

        return [
            createResourceBundleQuery({
                category,
                organization,
                service: commonClinicalDataset,
                method: 'getVaccinations',
            }),
            createResourceBundleQuery({
                category,
                organization,
                service: vaccinationImmunization,
                method: 'getVaccinations',
            }),
            createResourceBundleQuery({
                category,
                organization,
                service: commonClinicalDataset,
                method: 'getPlannedImmunizations',
            }),
        ].filter(isNonNullish);
    },
};
