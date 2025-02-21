import { type CustomIntlShape } from '../../types';
import { getIntlConfig, type IntlOptions } from '../base/base';
import { fhirMessagesNL, type FhirMessagesIds } from './messages';

export type { FhirMessagesIds };

export type FhirIntlShape<RichtTextElement = string> = CustomIntlShape<
    RichtTextElement,
    FhirMessagesIds
>;

export type FhirIntlOptions<RichTextElement> = Omit<IntlOptions<RichTextElement>, 'messages'>;

export function getFhirIntlConfig<RichTextElement>(options: FhirIntlOptions<RichTextElement>) {
    return getIntlConfig<RichTextElement>({ messages: fhirMessagesNL, ...options });
}
