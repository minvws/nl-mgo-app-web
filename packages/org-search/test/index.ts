import { faker } from '@faker-js/faker';
import { organization } from './organization.js';

type CustomizedFaker = typeof faker & {
    custom: {
        organization: typeof organization;
    };
};

const customizedFaker = faker as CustomizedFaker;

customizedFaker.custom = {
    organization,
};

export { customizedFaker as faker };
