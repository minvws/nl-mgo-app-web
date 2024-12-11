import fhirMessages from './locales/compiled/nl/fhir.json';
import resourceLabels from './locales/compiled/nl/resource-labels.json';

export const messagesNL = {
    ...resourceLabels,
    ...fhirMessages,
};

export type MessagesIds = keyof typeof messagesNL;
