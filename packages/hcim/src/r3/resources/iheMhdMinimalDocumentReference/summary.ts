import { common } from '@minvws/mgo-hcim-ui';
import { SummarySchemaFunction } from '../../../resourceTypes.js';
import { type IheMhdMinimalDocumentReference } from './iheMhdMinimalDocumentReference.js';

const i18n = 'r3.ihe_mhd_minimal_document_reference';

export const summary: SummarySchemaFunction<IheMhdMinimalDocumentReference> = (
    resource,
    context
) => {
    const { ui, formatMessage } = context;

    return {
        label: resource.content.attachment?.title ?? formatMessage('fhir.unknown'),
        children: [
            {
                children: [
                    ui.instant(`${i18n}.indexed`, resource.indexed),
                    ui.reference(`${i18n}.subject`, resource.subject),
                    ui.codeableConcept(`${i18n}.type`, resource.type),
                ],
            },

            {
                label: formatMessage(`summary.${i18n}.group_attachment`),
                children: [ui.attachment(resource.content.attachment)],
            },

            {
                label: formatMessage(`summary.${i18n}.group_author`),
                children: [
                    ui.reference(`${i18n}.author`, resource.author),
                    common.organization(context, context.organization),
                ],
            },
            common.summaryOptions(context, i18n, resource),
        ],
    };
};
