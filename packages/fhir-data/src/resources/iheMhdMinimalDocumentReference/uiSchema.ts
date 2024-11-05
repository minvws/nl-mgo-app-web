import { ui, type UiSchema } from '../../ui';
import { map } from '../../utils';
import { isNonNullish } from '../../utils/isNonNullish/isNonNullish';
import { type IheMhdMinimalDocumentReference } from './iheMhdMinimalDocumentReference';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317388
 */
export function uiSchema(resource: IheMhdMinimalDocumentReference): UiSchema {
    const i18n = 'ihe_mhd_minimal_document_reference';

    return {
        label: resource.description,
        children: [
            {
                label: i18n,
                children: [
                    ui.string(`${i18n}.indexed`, resource.indexed),
                    ui.string(`${i18n}.status`, resource.status),
                    ui.codeableConcept(`${i18n}.type`, resource.type),
                ],
            },
            {
                label: `${i18n}.author_group`,
                children: [...map(resource.author, (x) => ui.reference(`${i18n}.author`, x), true)],
            },
            {
                label: `${i18n}.options`,
                children: [
                    resource.content.attachment
                        ? ui.downloadLink(resource.content.attachment)
                        : null,
                ].filter(isNonNullish),
            },
        ],
    };
}
