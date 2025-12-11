import { type HealthcareOrganization } from '$/store/organizations/organizations';
import { faker } from '@faker-js/faker';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { kebabCase } from 'lodash';

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

export const healthcareOrganization = createMockFactory<HealthcareOrganization>(() => {
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
        dataServices: [
            { id: DataServiceId.VaccinationImmunization, resourceEndpoint: faker.internet.url() },
            { id: DataServiceId.CommonClinicalDataset, resourceEndpoint: faker.internet.url() },
            { id: DataServiceId.PdfA, resourceEndpoint: faker.internet.url() },
            { id: DataServiceId.GeneralPractitioner, resourceEndpoint: faker.internet.url() },
        ],
    };
});
