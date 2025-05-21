import { type Resource } from '$/store';
import { faker } from '@faker-js/faker';
import { dataServiceId } from './dataServiceId';
import { createMockDataFactory } from './factory';

export const resource = createMockDataFactory<Resource>(() => {
    return {
        id: faker.string.uuid(),
        slug: faker.lorem.slug(),
        organizationId: faker.string.uuid(),
        dataServiceId: dataServiceId(),
        dataServiceMethod: faker.lorem.word(),
        label: faker.lorem.words(),
        mgoResource: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    };
});
