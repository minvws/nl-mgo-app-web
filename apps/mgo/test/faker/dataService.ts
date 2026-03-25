import { dataServiceConfigs } from '$/config/dataService/dataService';
import { faker } from '@faker-js/faker';
import { DataService } from '@minvws/mgo-org-search';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';

const supportedDataServiceIds = dataServiceConfigs.map((x) => x.id);

export const dataService = createMockFactory<DataService>(() => ({
    id: faker.helpers.arrayElement(supportedDataServiceIds),
    authEndpoint: faker.internet.url(),
    tokenEndpoint: faker.internet.url(),
    resourceEndpoint: faker.internet.url(),
}));
