import { faker } from '@faker-js/faker';
import { Organization as OrganizationSearchResult } from '@minvws/mgo-org-search';
import { createMockFactory, mockArray } from '@minvws/mgo-utils/test/shared';
import { dataService } from './dataService';

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

export const organizationSearchResult = createMockFactory<OrganizationSearchResult>(() => {
    const displayName = faker.company.name();
    const careType = faker.helpers.arrayElement(categories);
    const postalCode = faker.location.zipCode('#### ??');
    const city = faker.location.city();

    return {
        id: `${faker.lorem.word()}-${faker.lorem.word()}`,
        medmijId: faker.string.uuid(),
        name: displayName,
        normalizedName: displayName,
        careType,
        address: `${faker.location.streetAddress()} ${faker.location.buildingNumber()}`,
        postalCode,
        city,
        geoLat: faker.number.float({ min: 50.75, max: 53.7 }),
        geoLng: faker.number.float({ min: 3.2, max: 7.23 }),
        searchBlob: `${displayName} ${careType} ${postalCode} ${city}`,
        dataServices: mockArray({
            factory: dataService,
            min: 1,
            max: 5,
        }),
    };
});
