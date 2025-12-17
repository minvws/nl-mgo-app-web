import { faker } from '@faker-js/faker';
import { organizationDto } from './organizationDto.js';

type CustomizedFaker = typeof faker & {
    custom: {
        organizationDto: typeof organizationDto;
    };
};

const customizedFaker = faker as CustomizedFaker;

customizedFaker.custom = {
    organizationDto,
};

export { customizedFaker as faker };
