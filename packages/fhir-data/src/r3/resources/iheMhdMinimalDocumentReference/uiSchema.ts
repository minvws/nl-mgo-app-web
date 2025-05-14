import { type HealthUiSchemaFunction } from '../../../ui';
import { type SingleValue } from '../../../ui/types';
import { type IheMhdMinimalDocumentReference } from './iheMhdMinimalDocumentReference';

export const i18n = 'r3.ihe_mhd_minimal_document_reference';

export const uiSchema: HealthUiSchemaFunction<IheMhdMinimalDocumentReference> = (
    resource,
    context
) => {
    const { ui, formatMessage } = context;

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
        ? ({
              Title: {
                  label: formatMessage(`${i18n}.content.attachment.title`),
                  type: 'SINGLE_VALUE',
                  display: resource.content.attachment.title,
              },
              ContentType: {
                  label: formatMessage(`${i18n}.content.attachment.content_type`),
                  type: 'SINGLE_VALUE',
                  display: resource.content.attachment.contentType,
              },
              Language: {
                  label: formatMessage(`${i18n}.content.attachment.language`),
                  type: 'SINGLE_VALUE',
                  display: resource.content.attachment.language,
              },
              Location: ui.attachment(resource.content.attachment),
          } as const)
        : null;

    return {
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
                label: formatMessage(`details.${i18n}.group_author`),
                children: [generalInformation.Author],
            },
            ...(content
                ? [
                      {
                          label: formatMessage(`${i18n}.content`),
                          children: [content.ContentType, content.Language],
                      },
                      {
                          label: formatMessage(`details.${i18n}.group_attachment`),
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
    };
};
