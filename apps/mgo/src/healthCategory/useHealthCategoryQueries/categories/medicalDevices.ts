import { HealthCategory } from '$/healthCategory/HealthCategory';
import { getDataService } from '$/services';
import { type HealthcareOrganization } from '$/store';
import { DataServiceId } from '@minvws/mgo-data-services';
import { isNonNullish } from '@minvws/mgo-utils';
import { type CategoryQueriesConfig } from '.';
import { createResourceBundleQuery } from '../createResourceBundleQuery';

const category = HealthCategory.MedicalDevices;

export const medicalDevices: CategoryQueriesConfig<typeof category> = {
    category,
    getQueries: (organization: HealthcareOrganization) => {
        const commonClinicalDataset = getDataService(
            organization,
            DataServiceId.CommonClinicalDataset
        );

        return [
            createResourceBundleQuery({
                category,
                organization,
                service: commonClinicalDataset,
                method: 'getMedicalAids',
            }),
            createResourceBundleQuery({
                category,
                organization,
                service: commonClinicalDataset,
                method: 'getPlannedMedicalDevices',
            }),
        ].filter(isNonNullish);
    },
};
