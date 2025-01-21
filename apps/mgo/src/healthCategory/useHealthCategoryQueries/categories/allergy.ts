import { getDataService } from '$/services';
import { type HealthcareOrganization } from '$/store';
import { isNonNullish } from '$/utils';
import { DataServiceId } from '@minvws/mgo-fhir-client';
import { createResourceBundleQuery } from '../createResourceBundleQuery';
import { HealthCategory } from '$/healthCategory/HealthCategory';
import { type CategoryQueriesConfig } from '.';

const category = HealthCategory.AllergiesAndIntolerances;

export const allergies: CategoryQueriesConfig<typeof category> = {
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
                method: 'getAllergies',
            }),
            createResourceBundleQuery({
                category,
                organization,
                service: generalPracticionerService,
                method: 'getMedicationIntolerance',
            }),
        ].filter(isNonNullish);
    },
};
