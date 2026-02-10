import { faker } from '@faker-js/faker';
import {
    DataServiceEndpoints,
    Organization as OrganizationSearchResult,
} from '@minvws/mgo-org-search';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';

enum DataServiceId {
    CommonClinicalDataset = '48',
    GeneralPractitioner = '49',
    PdfA = '51',
    VaccinationImmunization = '63',
}

const categories = [
    'Huisartspraktijk',
    'Apothekers',
    'Fysiotherapeuten',
    'Logopedisten',
    'Ziekenhuizen',
    'Verloskundigen',
    'Tandartsen',
    'Dietisten',
];

const mockDataEndpoints = createMockFactory<DataServiceEndpoints>(() => ({
    authEndpoint: faker.internet.url(),
    tokenEndpoint: faker.internet.url(),
    resourceEndpoint: faker.internet.url(),
}));

export const organizationSearchResult = createMockFactory<OrganizationSearchResult>(() => {
    const displayName = faker.company.name();
    const careTypeDisplay = faker.helpers.arrayElement(categories);
    const postalCode = faker.location.zipCode('#### ??');
    const city = faker.location.city();

    return {
        id: `${faker.lorem.word()}-${faker.lorem.word()}`,
        displayName: displayName,
        normalizedDisplayName: displayName,
        careTypeDisplay,
        addressLine: `${faker.location.streetAddress()} ${faker.location.buildingNumber()}`,
        postalCode,
        city,
        geoLat: faker.number.float({ min: 50.75, max: 53.7 }),
        geoLng: faker.number.float({ min: 3.2, max: 7.23 }),
        searchBlob: `${displayName} ${careTypeDisplay} ${postalCode} ${city}`,
        dataServices: {
            [DataServiceId.VaccinationImmunization]: mockDataEndpoints(),
            [DataServiceId.CommonClinicalDataset]: mockDataEndpoints(),
            [DataServiceId.PdfA]: mockDataEndpoints(),
            [DataServiceId.GeneralPractitioner]: mockDataEndpoints(),
        },
    };
});
