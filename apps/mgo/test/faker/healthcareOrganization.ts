import { type HealthcareOrganization } from '$/store/organizations/organizations';
import { faker } from '@faker-js/faker';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { organizationSearchResult } from './organizationSearchResult';

export const healthcareOrganization = createMockFactory<HealthcareOrganization>(() => {
    const searchResult = organizationSearchResult();

    const { normalizedName, ...rest } = searchResult;

    return {
        slug: `zorgaanbieder-${faker.number.int()}`,
        dataServices: searchResult.dataServices ?? [],
        ...rest,
    };
});
