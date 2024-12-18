import { type UiSchemaFunction } from '../../../ui';
import { type SingleValue } from '../../../ui/types';
import { type IheMhdMinimalDocumentReference } from './iheMhdMinimalDocumentReference';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317388
 */
export const uiSchema: UiSchemaFunction<IheMhdMinimalDocumentReference> = (resource, context) => {
    const { ui, formatMessage, setEmptyEntries } = context;
    const i18n = 'r3.ihe_mhd_minimal_document_reference';

    const generalInformation = {
        MasterIdentifier: ui.identifier(`${i18n}.master_identifier`, resource.masterIdentifier),
        Status: ui.code(`${i18n}.status`, resource.status),
        Type: ui.codeableConcept(`${i18n}.type`, resource.type),
        Class: ui.codeableConcept(`${i18n}.class`, resource.class),
        Subject: ui.reference(`${i18n}.subject`, resource.subject),
        Indexed: ui.instant(`${i18n}.indexed`, resource.indexed),
        Author: ui.reference(`${i18n}.author`, resource.author),
        SecurityLabel: ui.codeableConcept(`${i18n}.security_label`, resource.securityLabel),
    };

    const content = resource.content.attachment
        ? {
              Title: ui.string(
                  `${i18n}.content.attachment.title`,
                  resource.content.attachment.title
              ),
              ContentType: ui.string(
                  `${i18n}.content.attachment.content_type`,
                  resource.content.attachment.contentType
              ),
              Language: ui.string(
                  `${i18n}.content.attachment.language`,
                  resource.content.attachment.language
              ),
              Location: ui.downloadLink(resource.content.attachment),
          }
        : null;

    return setEmptyEntries({
        label: (content?.Title.display as string) ?? formatMessage('fhir.unknown'),
        children: [
            {
                label: formatMessage(`fhir.group_general_info`),
                children: [
                    generalInformation.Subject,

                    generalInformation.Indexed,
                    generalInformation.MasterIdentifier,
                    generalInformation.Status,
                    generalInformation.SecurityLabel,
                    generalInformation.Type,
                ],
            },
            {
                label: formatMessage(`${i18n}.group_author`),
                children: [generalInformation.Author],
            },
            ...(content
                ? [
                      {
                          label: formatMessage(`${i18n}.content`),
                          children: [content.ContentType, content.Language],
                      },
                      {
                          label: formatMessage(`${i18n}.group_attachment`),
                          children: [content.Location],
                      },
                  ]
                : [
                      {
                          label: formatMessage(`${i18n}.content`),
                          children: [
                              {
                                  label: formatMessage(`${i18n}.content`),
                                  type: 'SINGLE_VALUE',
                                  display: undefined,
                              } as SingleValue,
                          ],
                      },
                  ]),
        ],
    });
};
