import { faker } from '@faker-js/faker';
import { type FhirMessagesIds } from '@minvws/mgo-intl';

export const fhirMessageId = () => faker.lorem.word() as FhirMessagesIds;
