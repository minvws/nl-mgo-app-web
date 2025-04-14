import { HealthCategory } from '$/healthCategory/HealthCategory';
import { getDataService } from '$/services';
import { type HealthcareOrganization } from '$/store';
import { DataServiceId } from '@minvws/mgo-data-services';
import { isNonNullish } from '@minvws/mgo-mgo-utils';
import { type CategoryQueriesConfig } from '.';
import { createResourceBundleQuery } from '../createResourceBundleQuery';

const category = HealthCategory.Procedures;

export const procedures: CategoryQueriesConfig<typeof category> = {
    category,
    getQueries: (organization: HealthcareOrganization) => {
        const commonClinicalDataset = getDataService(
            organization,
            DataServiceId.CommonClinicalDataset
        );
        const generalPracticionerService = getDataService(
            organization,
            DataServiceId.GeneralPractitioner
        );

        return [
            createResourceBundleQuery({
                category,
                organization,
                service: commonClinicalDataset,
                method: 'getSurgicalProcedures',
            }),
            createResourceBundleQuery({
                category,
                organization,
                service: commonClinicalDataset,
                method: 'getPlannedProcedures',
            }),
            createResourceBundleQuery({
                category,
                organization,
                service: generalPracticionerService,
                method: 'getEpisodes',
            }),
        ].filter(isNonNullish);
    },
};
