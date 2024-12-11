import { uiSchemaGroup as zibAttachmentUiSchema } from '../../elements/attachment/uiSchemaGroup';
import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { map } from '../../../utils';
import { uiSchemaGroup as actorUiSchema } from './elements/actor/uiSchemaGroup';
import { uiSchemaGroup as dataUiSchema } from './elements/data/uiSchemaGroup';
import { uiSchemaGroup as exceptUiSchema } from './elements/except/uiSchemaGroup';
import { uiSchemaGroup as policyUiSchema } from './elements/policy/uiSchemaGroup';
import { type ZibTreatmentDirective } from './zibTreatmentDirective';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317378
 */
export const uiSchema: UiSchemaFunction<ZibTreatmentDirective> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const i18n = 'zib_treatment_directive';

    const actor = map(resource.actor, (x) => actorUiSchema(x, context), true);
    const data = map(resource.data, (x) => dataUiSchema(x, context), true);
    const except = map(resource.except, (x) => exceptUiSchema(x, context), true);
    const policy = map(resource.policy, (x) => policyUiSchema(x, context), true);

    return {
        label: resource.identifier?.value,
        children: [
            {
                label: `${i18n}.group_details`,
                children: [
                    ui.identifier(`${i18n}.identifier`, resource.identifier),
                    ui.code(`${i18n}.status`, resource.status),
                    ui.codeableConcept(`${i18n}.category`, resource.category),
                    ui.reference(`${i18n}.patient`, resource.patient),
                    ...ui.period(`${i18n}.period`, resource.period),
                    ui.dateTime(`${i18n}.date_time`, resource.dateTime),
                    ui.reference(`${i18n}.consenting_party`, resource.consentingParty),
                    ui.codeableConcept(`${i18n}.action`, resource.action),
                    ui.reference(`${i18n}.organization`, resource.organization),
                    ui.identifier(`${i18n}.source_identifier`, resource.sourceIdentifier),
                    ui.reference(`${i18n}.source_reference`, resource.sourceReference),
                    ui.string(`${i18n}.policy_rule`, resource.policyRule),
                    ui.coding(`${i18n}.security_label`, resource.securityLabel),
                    ui.coding(`${i18n}.purpose`, resource.purpose),
                    ...ui.period(`${i18n}.data_period`, resource.dataPeriod),
                ],
            },
            zibAttachmentUiSchema(resource.sourceAttachment, context),
            ...actor,
            ...data,
            ...except,
            ...policy,
        ],
    };
};
