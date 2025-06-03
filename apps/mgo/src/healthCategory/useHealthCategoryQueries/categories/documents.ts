import { HealthCategory } from '$/healthCategory/HealthCategory';
import { getDataService } from '$/services';
import { type HealthcareOrganization } from '$/store';
import { DataServiceId } from '@minvws/mgo-data-services';
import { isNonNullish } from '@minvws/mgo-utils';
import { type CategoryQueriesConfig } from '.';
import { createResourceBundleQuery } from '../createResourceBundleQuery';

const category = HealthCategory.Documents;

export const documents: CategoryQueriesConfig<typeof category> = {
    category,
    getQueries: (organization: HealthcareOrganization) => {
        const documentsService = getDataService(organization, DataServiceId.PdfA);

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
