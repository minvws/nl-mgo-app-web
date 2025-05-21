import { type UserInfo } from '$/auth/VadAuthProvider/takeUserInfoFromUrl';
import { faker } from '@faker-js/faker';

export function userInfo(): UserInfo {
    return {
        reference_pseudonym: { rid: faker.string.uuid() },
        person: {
            age: faker.number.int(100),
            name: {
                first_name: faker.person.firstName(),
                prefix: faker.person.prefix(),
                last_name: faker.person.lastName(),
                initials: faker.string.alpha(),
                full_name: faker.person.fullName(),
            },
        },
    };
}
