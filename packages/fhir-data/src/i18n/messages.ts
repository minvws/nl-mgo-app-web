import fhirMessages from './locales/compiled/nl/fhir.json';
import resourceLabels from './locales/compiled/nl/resource-labels.json';
import r4ResourceLabels from './locales/compiled/nl/r4-resource-labels.json';

export const messagesNL = {
    ...resourceLabels,
    ...r4ResourceLabels,
    ...fhirMessages,
};

export type MessagesIds = keyof typeof messagesNL;
