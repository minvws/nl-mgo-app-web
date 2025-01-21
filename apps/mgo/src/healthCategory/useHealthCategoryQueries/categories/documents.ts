import { getDataService } from '$/services';
import { type HealthcareOrganization } from '$/store';
import { isNonNullish } from '$/utils';
import { createResourceBundleQuery } from '../createResourceBundleQuery';
import { DataServiceId } from '@minvws/mgo-fhir-client';
import { HealthCategory } from '$/healthCategory/HealthCategory';
import { type CategoryQueriesConfig } from '.';

const category = HealthCategory.Documents;

export const documents: CategoryQueriesConfig<typeof category> = {
    category,
    getQueries: (organization: HealthcareOrganization) => {
        const documentsService = getDataService(organization, DataServiceId.Documents);

        return [
            createResourceBundleQuery({
                category,
                organization,
                service: documentsService,
                method: 'getDocumentReferences',
            }),
        ].filter(isNonNullish);
    },
};
