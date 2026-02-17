import { type HealthcareOrganization } from '$/store/organizations/organizations';
import { faker } from '@faker-js/faker';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { organizationSearchResult } from './organizationSearchResult';

export const healthcareOrganization = createMockFactory<HealthcareOrganization>(() => {
    const searchResult = organizationSearchResult();

    const {
        normalizedDisplayName,
        displayName,
        careTypeDisplay,
        dataServices: dataServicesObject,
        ...rest
    } = searchResult;

    const dataServices = Object.entries(dataServicesObject || {}).map(([id, endpoints]) => ({
        id,
        ...endpoints,
    }));

    return {
        slug: `zorgaanbieder-${faker.number.int()}`,
        dataServices,
        name: displayName,
        careType: careTypeDisplay,
        ...rest,
    };
});
