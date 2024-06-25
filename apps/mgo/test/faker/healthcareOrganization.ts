import { type HealthcareOrganization } from '$/store/organizations';
import { faker } from '@faker-js/faker';
import { kebabCase } from 'lodash';
import { createMockDataFactory } from './factory';

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

export const healthcareOrganization = createMockDataFactory<HealthcareOrganization>(() => {
    const name = faker.company.name();
    const streetAddress = `${faker.location.streetAddress()} ${faker.location.buildingNumber()}`;
    const postalcode = faker.location.zipCode('#### ??');
    const city = faker.location.city();

    return {
        id: `${faker.lorem.word()}-${faker.lorem.word()}`,
        name: faker.company.name(),
        slug: kebabCase(name),
        category: faker.helpers.arrayElement(categories),
        address: `${streetAddress}\r\n${postalcode} ${city}`,
        resourceEndpoints: {
            commonClinicalDataset: faker.internet.url(),
            generalPractitioner: faker.internet.url(),
            documents: faker.internet.url(),
        },
    };
});
