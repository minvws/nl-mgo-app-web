import {
    DataServiceEndpoints,
    Organization as OrganizationSearchResult,
} from '@minvws/mgo-org-search';

export interface DataService extends DataServiceEndpoints {
    id: string;
}

export type NormalizedHealthcareOrganization = Omit<
    OrganizationSearchResult,
    'dataServices' | 'normalizedDisplayName' | 'displayName' | 'careTypeDisplay'
> & {
    dataServices: DataService[];
    name?: string;
    careType?: string;
};

export function normalizeOrganization(
    organizationSearchResult: OrganizationSearchResult
): NormalizedHealthcareOrganization {
    const {
        dataServices: dataServicesObject,
        normalizedDisplayName,
        displayName,
        careTypeDisplay,
        ...rest
    } = organizationSearchResult;
    const dataServices: DataService[] = [];

    for (const [id, dataServiceEndpoints] of Object.entries(dataServicesObject || {})) {
        dataServices.push({
            id,
            ...dataServiceEndpoints,
        });
    }
    return {
        ...rest,
        name: displayName,
        careType: careTypeDisplay,
        dataServices,
    };
}
