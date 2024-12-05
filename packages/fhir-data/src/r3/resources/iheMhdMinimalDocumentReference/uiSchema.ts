import { ui, type UiSchema } from '../../../ui';
import { map } from '../../../utils';
import { isNonNullish } from '../../../utils/isNonNullish/isNonNullish';
import { type IheMhdMinimalDocumentReference } from './iheMhdMinimalDocumentReference';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317388
 */
export function uiSchema(resource: IheMhdMinimalDocumentReference): UiSchema {
    const i18n = 'ihe_mhd_minimal_document_reference';

    const generalInformation = {
        MasterIdentifier: ui.identifier(`${i18n}.master_identifier`, resource.masterIdentifier),
        Status: ui.code(`${i18n}.status`, resource.status),
        Type: ui.codeableConcept(`${i18n}.type`, resource.type),
        Class: ui.codeableConcept(`${i18n}.class`, resource.class),
        Subject: ui.reference(`${i18n}.subject`, resource.subject),
        Indexed: ui.string(`${i18n}.indexed`, resource.indexed),
        Created: ui.string(`${i18n}.created`, resource.created),
        Author: map(resource.author, (x) => ui.reference(`${i18n}.author`, x), true),
        SecurityLabel: ui.multipleValues(
            `${i18n}.security_label`,
            resource.securityLabel,
            ui.codeableConcept
        ),
    };

    const content = {
        Title: ui.string(`${i18n}.content.attachment.title`, resource.content.attachment?.title),
        ContentType: ui.string(
            `${i18n}.content.attachment.content_type`,
            resource.content.attachment?.contentType
        ),
        Language: ui.string(
            `${i18n}.content.attachment.language`,
            resource.content.attachment?.language
        ),
        Location: resource.content.attachment ? ui.downloadLink(resource.content.attachment) : null,
        Url: ui.string(`${i18n}.content.attachment.url`, resource.content.attachment?.url),
        Creation: ui.dateTime(
            `${i18n}.content.attachment.date_time`,
            resource.content.attachment?.creation
        ),
    };

    return {
        label: content.Title.display,
        children: [
            {
                label: `${i18n}.group_general_information`,
                children: [
                    generalInformation.Indexed,
                    generalInformation.Created,
                    ...generalInformation.Author,
                    generalInformation.Subject,
                    generalInformation.MasterIdentifier,
                    generalInformation.Status,
                    generalInformation.SecurityLabel,
                    content.ContentType,
                    content.Language,
                    generalInformation.Type,
                ],
            },
            {
                label: `${i18n}.document`,
                children: [content.Url, content.Creation, content.Location].filter(isNonNullish),
            },
        ],
    };
}
