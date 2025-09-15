import { type Resource } from '$/store';
import { faker } from '@faker-js/faker';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { dataServiceId } from './dataServiceId';

export const resource = createMockFactory<Resource>(() => {
    return {
        id: faker.string.uuid(),
        slug: faker.lorem.slug(),
        organizationId: faker.string.uuid(),
        dataServiceId: dataServiceId(),
        dataServiceMethod: faker.lorem.word(),
        summary: { label: faker.lorem.words(), children: [] },
        mgoResource: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    };
});
