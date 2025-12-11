import { type Resource } from '$/store';
import { faker } from '@faker-js/faker';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { mgoResource } from './mgoResource';

export const resource = createMockFactory<Resource>(() => {
    return {
        id: faker.string.uuid(),
        slug: faker.lorem.slug(),
        source: {
            organizationId: faker.string.uuid(),
            dataServiceId: `${faker.number.int()}`,
            endpointId: faker.lorem.word(),
        },
        summary: { label: faker.lorem.words(), children: [] },
        mgoResource: mgoResource(),
    };
});
