import { type Address } from '$/types/Organisation';
import { faker } from '@faker-js/faker';
import { createMockDataFactory } from './factory';

export const address = createMockDataFactory<Address>(() => {
    const streetAddress = `${faker.location.streetAddress()} ${faker.location.buildingNumber()}`;
    const postalcode = faker.location.zipCode('#### ??');
    const city = faker.location.city();

    return {
        active: faker.datatype.boolean(),
        address: `${streetAddress}\r\n${postalcode} ${city}`,
        city,
        country: faker.location.country(),
        postalcode,
        type: faker.helpers.arrayElement(['physical', 'postal']),
        lines: [streetAddress],
        geolocation: {
            latitude: faker.location.latitude(),
            longitude: faker.location.longitude(),
        },
    };
});
