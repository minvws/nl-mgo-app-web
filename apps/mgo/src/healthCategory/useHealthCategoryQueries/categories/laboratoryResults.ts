import { HealthCategory } from '$/healthCategory/HealthCategory';
import { getDataService } from '$/services';
import { type HealthcareOrganization } from '$/store';
import { isNonNullish } from '$/utils';
import { DataServiceId } from '@minvws/mgo-data-services';
import { type CategoryQueriesConfig } from '.';
import { createResourceBundleQuery } from '../createResourceBundleQuery';

const category = HealthCategory.LaboratoryResults;

export const laboratoryResults: CategoryQueriesConfig<typeof category> = {
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
                method: 'getLastLaboratoryResultsPerType',
            }),

            createResourceBundleQuery({
                category,
                organization,
                service: generalPracticionerService,
                method: 'getDiagnosticAndLabResults',
            }),
        ].filter(isNonNullish);
    },
};
