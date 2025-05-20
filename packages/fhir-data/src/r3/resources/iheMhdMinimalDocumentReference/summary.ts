import { type HealthUiSchemaFunction } from '../../../ui';
import { organization } from '../../../ui/common/organization/organization';
import { summaryOptions } from '../../../ui/common/summaryOptions/summaryOptions';
import { type IheMhdMinimalDocumentReference } from './iheMhdMinimalDocumentReference';

const i18n = 'r3.ihe_mhd_minimal_document_reference';

export const summary: HealthUiSchemaFunction<IheMhdMinimalDocumentReference> = (
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
                children: [ui.reference(`${i18n}.author`, resource.author), organization(context)],
            },
            summaryOptions(context, i18n, resource),
        ],
    };
};
