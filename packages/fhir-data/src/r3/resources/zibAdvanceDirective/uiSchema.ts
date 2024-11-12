import { uiSchemaGroup as attachmentUiSchema } from '../../elements/attachment/uiSchemaGroup';
import { ui, type UiSchema } from '../../../ui';
import { type ZibAdvanceDirective } from './zibAdvanceDirective';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317129
 */
export function uiSchema(resource: ZibAdvanceDirective): UiSchema {
    const profile = 'zib_advance_directive';

    const attachment = attachmentUiSchema(resource.source.attachment);

    return {
        label: resource.dateTime,
        children: [
            {
                label: `${profile}.group_details`,
                children: [
                    ui.multipleValues(
                        `${profile}.type_of_living_will`,
                        resource.category,
                        ui.codeableConcept
                    ),
                    ui.dateTime(`${profile}.date_time`, resource.dateTime),
                    ui.reference(`${profile}.disorder`, resource.disorder),
                    ui.multipleValues(
                        `${profile}.consenting_party`,
                        resource.consentingParty,
                        ui.reference
                    ),
                    ui.string(`${profile}.comment`, resource.comment),
                ],
            },
            attachment,
        ],
    };
}
