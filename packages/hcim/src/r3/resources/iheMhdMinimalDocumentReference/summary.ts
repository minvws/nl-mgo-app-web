import { common } from '@minvws/mgo-hcim-ui';
import { map } from '@minvws/mgo-utils';
import { SummarySchemaFunction } from '../../../resourceTypes.js';
import { type IheMhdMinimalDocumentReference } from './iheMhdMinimalDocumentReference.js';

const i18n = 'r3.ihe_mhd_minimal_document_reference';

export const summary: SummarySchemaFunction<IheMhdMinimalDocumentReference> = (
    resource,
    context
) => {
    const { ui, formatMessage } = context;

    return {
        id: i18n,
        label: resource.content?.[0]?.attachment?.title ?? formatMessage('fhir.unknown'),
        children: [
            {
                id: `summary.${i18n}.default`,
                children: [
                    ui.instant(`${i18n}.indexed`, resource.indexed),
                    ui.codeableConcept(`${i18n}.type`, resource.type),
                ],
            },

            {
                id: `summary.${i18n}.group_attachment`,
                label: formatMessage(`summary.${i18n}.group_attachment`),
                children: [
                    ...map(resource.content, (content) => ui.attachment(content.attachment), true),
                ],
            },

            {
                id: `summary.${i18n}.group_author`,
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
