import { type CustomIntlShape } from '../../types/index.js';
import { getIntlConfig, type IntlOptions } from '../base/base.js';
import { fhirMessagesNL, type FhirMessagesIds } from './messages.js';

export type { FhirMessagesIds };

export type FhirIntlShape<RichTextElement = string> = CustomIntlShape<
    RichTextElement,
    FhirMessagesIds
>;

export type FhirIntlOptions<RichTextElement> = Omit<IntlOptions<RichTextElement>, 'messages'>;

export function getFhirIntlConfig<RichTextElement>(options: FhirIntlOptions<RichTextElement>) {
    return getIntlConfig<RichTextElement>({ messages: fhirMessagesNL, ...options });
}
