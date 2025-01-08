import { faker } from '@faker-js/faker';
import { type MgoString } from '../../../../src/parse/type';

export function string(value?: string) {
    return (value ?? faker.lorem.word()) as MgoString;
}
