import fhirMessages from './locales/compiled/nl/fhir.json';
import summaryLabels from './locales/compiled/nl/summary.json';
import codeLabels from './locales/compiled/nl/codes.json';
import detailLabels from './locales/compiled/nl/detail.json';
import r3ResourceLabels from './locales/compiled/nl/r3-resource-labels.json';
import r3ResourceLabelsCustom from './locales/compiled/nl/r3-resource-labels-custom.json';
import r4ResourceLabels from './locales/compiled/nl/r4-resource-labels.json';
import r4ResourceLabelsCustom from './locales/compiled/nl/r4-resource-labels-custom.json';

export enum Locale {
    NL_NL = 'nl-NL',
}

export const messagesNL = {
    ...r3ResourceLabels,
    ...r3ResourceLabelsCustom,
    ...r4ResourceLabels,
    ...r4ResourceLabelsCustom,
    ...summaryLabels,
    ...detailLabels,
    ...codeLabels,
    ...fhirMessages,
};

export type MessagesIds = keyof typeof messagesNL;
