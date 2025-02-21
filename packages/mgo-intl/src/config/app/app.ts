import { type CustomIntlShape } from '../../types';
import { getIntlConfig, type IntlOptions } from '../base/base';
import { appMessagesNL, type AppMessagesIds } from './messages';

export type { AppMessagesIds };

export type AppIntlShape<RichTextElement = string> = CustomIntlShape<
    RichTextElement,
    AppMessagesIds
>;

export type AppIntlOptions<RichTextElement> = Omit<IntlOptions<RichTextElement>, 'messages'>;

export function getAppIntlConfig<RichTextElement>(options: AppIntlOptions<RichTextElement>) {
    return getIntlConfig<RichTextElement>({ messages: appMessagesNL, ...options });
}
