import { faker } from '@faker-js/faker';
import { type MessagesIds } from '../../src/i18n/messages';

export const messageId = () => faker.lorem.word() as MessagesIds;
