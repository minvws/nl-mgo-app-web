import { type HealthUiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { uiSchemaGroup as attachmentUiSchema } from '../../elements/attachment/uiSchemaGroup';
import { type ZibAdvanceDirective } from './zibAdvanceDirective';

export const i18n = 'r3.zib_advance_directive';
export const uiSchema: HealthUiSchemaFunction<ZibAdvanceDirective> = (resource, context) => {
    const ui = context.ui as NonStrictUi;

    const attachment = attachmentUiSchema(resource.source.attachment, context);

    return {
        label: resource.dateTime ?? context.formatMessage(i18n),
        children: [
            {
                label: `${i18n}.group_details`,
                children: [
                    ui.codeableConcept(`${i18n}.type_of_living_will`, resource.category),
                    ui.dateTime(`${i18n}.date_time`, resource.dateTime),
                    ui.reference(`${i18n}.disorder`, resource.disorder),
                    ui.reference(`${i18n}.consenting_party`, resource.consentingParty),
                    ui.string(`${i18n}.comment`, resource.comment),
                ],
            },
            attachment,
        ],
    };
};
