import { type CustomIntlShape } from '../../types/index.js';
import { getIntlConfig, type IntlOptions } from '../base/base.js';
import { appMessagesNL, type AppMessagesIds } from './messages.js';

export type { AppMessagesIds };

export type AppIntlShape<RichTextElement = string> = CustomIntlShape<
    RichTextElement,
    AppMessagesIds
>;

export type AppIntlOptions<RichTextElement> = Omit<IntlOptions<RichTextElement>, 'messages'>;

export function getAppIntlConfig<RichTextElement>(options: AppIntlOptions<RichTextElement>) {
    return getIntlConfig<RichTextElement>({ messages: appMessagesNL, ...options });
}
