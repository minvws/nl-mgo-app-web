import { getDataService } from '$/services';
import { type HealthcareOrganization } from '$/store';
import { createResourceBundleQuery } from '../createResourceBundleQuery';
import { isNonNullish } from '$/utils';
import { DataServiceId } from '@minvws/mgo-fhir-client';
import { HealthCategory } from '$/healthCategory/HealthCategory';
import { type CategoryQueriesConfig } from '.';

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
