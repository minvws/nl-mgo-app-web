import codeLabels from '../../../locales/fhir/compiled/nl/codes.json';
import detailLabels from '../../../locales/fhir/compiled/nl/details.json';
import fhirMessages from '../../../locales/fhir/compiled/nl/fhir.json';
import r3ResourceLabels from '../../../locales/fhir/compiled/nl/r3-resource-labels.json';
import r4ResourceLabels from '../../../locales/fhir/compiled/nl/r4-resource-labels.json';
import summaryLabels from '../../../locales/fhir/compiled/nl/summary.json';
import systemLabels from '../../../locales/fhir/compiled/nl/system.json';
import r3ResourceLabelsDefault from '../../../locales/static/compiled/nl/r3-resource-labels.json';
import r4ResourceLabelsDefault from '../../../locales/static/compiled/nl/r4-resource-labels.json';

export const fhirMessagesNL = {
    ...r3ResourceLabelsDefault,
    ...r4ResourceLabelsDefault,
    ...r3ResourceLabels,
    ...r4ResourceLabels,
    ...summaryLabels,
    ...detailLabels,
    ...codeLabels,
    ...systemLabels,
    ...fhirMessages,
};

export type FhirMessagesIds = keyof typeof fhirMessagesNL;
