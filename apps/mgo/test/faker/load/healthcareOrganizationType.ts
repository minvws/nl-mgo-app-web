import { type HealthcareOrganizationType } from '$/api/load/types';
import { faker } from '@faker-js/faker';
import { createMockDataFactory } from '../factory';

const vektisCodes = {
    '0100': 'Huisartspraktijk',
    '0200': 'Apothekers',
    '0400': 'Fysiotherapeuten',
    '0500': 'Logopedisten',
    '0600': 'Ziekenhuizen',
    '0800': 'Verloskundigen',
    '1200': 'Tandartsen',
    '2400': 'Dietisten',
};

export const healthcareOrganizationType = createMockDataFactory<HealthcareOrganizationType>(() => {
    const code = faker.helpers.arrayElement(Object.keys(vektisCodes));
    return {
        code,
        display_name: vektisCodes[code as keyof typeof vektisCodes],
        type: faker.internet.url(),
    };
});
