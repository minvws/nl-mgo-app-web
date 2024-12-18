import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { map } from '../../../utils';
import { isNonNullish } from '../../../utils/isNonNullish/isNonNullish';
import { type IheMhdDocumentManifest } from './iheMhdDocumentManifest';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317388
 */
export const uiSchema: UiSchemaFunction<IheMhdDocumentManifest> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const i18n = 'r3.ihe_mhd_document_manifest';

    return {
        label: resource.description,
        children: [
            {
                label: i18n,
                children: [
                    ui.dateTime(`${i18n}.created`, resource.created),
                    ui.string(`${i18n}.status`, resource.status),
                    ui.codeableConcept(`${i18n}.type`, resource.type),
                ],
            },
            {
                label: `${i18n}.author_group`,
                children: [
                    ...map(resource.author, (x) => ui.reference(`${i18n}.author`, x), true),
                    ...map(resource.recipient, (x) => ui.reference(`${i18n}.recipient`, x), true),
                ],
            },
            {
                label: `${i18n}.content`,
                children: [
                    ...map(
                        resource.content,
                        (content) =>
                            content.reference &&
                            ui.reference(`${i18n}.content.reference`, content.reference),
                        true
                    ),
                ].filter(isNonNullish),
            },
        ],
    };
};
