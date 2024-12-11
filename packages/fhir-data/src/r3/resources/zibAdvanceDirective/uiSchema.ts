import { uiSchemaGroup as attachmentUiSchema } from '../../elements/attachment/uiSchemaGroup';
import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { type ZibAdvanceDirective } from './zibAdvanceDirective';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317129
 */
export const uiSchema: UiSchemaFunction<ZibAdvanceDirective> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const profile = 'zib_advance_directive';

    const attachment = attachmentUiSchema(resource.source.attachment, context);

    return {
        label: resource.dateTime,
        children: [
            {
                label: `${profile}.group_details`,
                children: [
                    ui.codeableConcept(`${profile}.type_of_living_will`, resource.category),
                    ui.dateTime(`${profile}.date_time`, resource.dateTime),
                    ui.reference(`${profile}.disorder`, resource.disorder),
                    ui.reference(`${profile}.consenting_party`, resource.consentingParty),
                    ui.string(`${profile}.comment`, resource.comment),
                ],
            },
            attachment,
        ],
    };
};
