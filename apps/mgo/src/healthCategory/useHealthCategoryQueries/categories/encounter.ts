import { HealthCategory } from '$/healthCategory/HealthCategory';
import { getDataService } from '$/services';
import { type HealthcareOrganization } from '$/store';
import { DataServiceId } from '@minvws/mgo-data-services';
import { isNonNullish } from '@minvws/mgo-mgo-utils';
import { type CategoryQueriesConfig } from '.';
import { createResourceBundleQuery } from '../createResourceBundleQuery';

const category = HealthCategory.ContactsAndAppointments;

export const encounters: CategoryQueriesConfig<typeof category> = {
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
                method: 'getHospitalAdmissions',
            }),
            createResourceBundleQuery({
                category,
                organization,
                service: commonClinicalDataset,
                method: 'getPlannedEncounters',
            }),
            createResourceBundleQuery({
                category,
                organization,
                service: generalPracticionerService,
                method: 'getEncounters',
            }),
            createResourceBundleQuery({
                category,
                organization,
                service: generalPracticionerService,
                method: 'getCompositions',
            }),
        ].filter(isNonNullish);
    },
};
