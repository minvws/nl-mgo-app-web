import fhirMessages from './locales/compiled/nl/fhir.json';
import r3ResourceLabels from './locales/compiled/nl/r3-resource-labels.json';
import r3ResourceLabelsCustom from './locales/compiled/nl/r3-resource-labels-custom.json';
import r4ResourceLabels from './locales/compiled/nl/r4-resource-labels.json';
import r4ResourceLabelsCustom from './locales/compiled/nl/r4-resource-labels-custom.json';

export const messagesNL = {
    ...r3ResourceLabels,
    ...r3ResourceLabelsCustom,
    ...r4ResourceLabels,
    ...r4ResourceLabelsCustom,
    ...fhirMessages,
};

export type MessagesIds = keyof typeof messagesNL;
