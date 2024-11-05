import { getDataService } from '$/services';
import { type HealthcareOrganization } from '$/store';
import { isNonNullish } from '$/utils';
import { type UseQueryOptions } from '@tanstack/react-query';
import { createResourceBundleQuery } from '../createResourceBundleQuery';
import { DataServiceId } from '@minvws/mgo-fhir-client';

export function getDocumentsQueries(organization: HealthcareOrganization): UseQueryOptions[] {
    const documentsService = getDataService(organization, DataServiceId.Documents);

    return [
        createResourceBundleQuery({
            organization,
            service: documentsService,
            method: 'getDocumentReferences',
        }),
    ].filter(isNonNullish);
}
