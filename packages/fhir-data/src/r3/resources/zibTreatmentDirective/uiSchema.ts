import { isNonNullish } from '@minvws/mgo-mgo-utils';
import { type HealthUiSchemaFunction } from '../../../ui';
import { valueOf } from '../../../ui/helpers/valueOf/valueOf';
import { type NonStrictUi } from '../../../ui/types';
import { map } from '../../../utils';
import { uiSchemaGroup as actorUiSchema } from './elements/actor/uiSchemaGroup';
import { uiSchemaGroup as dataUiSchema } from './elements/data/uiSchemaGroup';
import { uiSchemaGroup as exceptUiSchema } from './elements/except/uiSchemaGroup';
import { uiSchemaGroup as policyUiSchema } from './elements/policy/uiSchemaGroup';
import { type ZibTreatmentDirective } from './zibTreatmentDirective';

export const i18n = 'r3.zib_treatment_directive';
export const uiSchema: HealthUiSchemaFunction<ZibTreatmentDirective> = (resource, context) => {
    const ui = context.ui as NonStrictUi;

    const actor = map(resource.actor, (x) => actorUiSchema(x, context), true);
    const data = map(resource.data, (x) => dataUiSchema(x, context), true);
    const except = map(resource.except, (x) => exceptUiSchema(x, context), true);
    const policy = map(resource.policy, (x) => policyUiSchema(x, context), true);

    return {
        label: valueOf(resource.identifier) ?? context.formatMessage(i18n),
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
                    resource.sourceAttachment ? ui.attachment(resource.sourceAttachment) : null,
                ].filter(isNonNullish),
            },
            ...actor,
            ...data,
            ...except,
            ...policy,
        ],
    };
};
