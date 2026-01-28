import { common } from '@minvws/mgo-hcim-ui';
import { isNonNullish } from '@minvws/mgo-utils';
import { type SummarySchemaFunction } from '../../../resourceTypes.js';
import { type EAfspraakAppointment } from './eAfspraakAppointment.js';

export const summary: SummarySchemaFunction<EAfspraakAppointment> = (resource, context) => {
    const { ui, formatMessage } = context;
    const i18n = 'r3.e_afspraak_appointment';
    const label = resource.appointmentType?.text ?? formatMessage(i18n);

    return {
        label,
        children: [
            {
                children: [
                    ui.codeableConcept(`${i18n}.appointment_type`, resource.appointmentType),
                    ui.dateTime(`${i18n}.start`, resource.start),
                    ui.reference(`${i18n}.indication`, resource.indication),
                    ui.codeableConcept(`${i18n}.reason`, resource.reason),
                ],
            },
            {
                label: formatMessage(`summary.${i18n}.group_actor_title`),
                children: [
                    ui.reference(
                        `${i18n}.participant.actor`,
                        resource.participant?.map((p) => p.actor).filter(isNonNullish)
                    ),
                    ui.codeableConcept(`${i18n}.specialty`, resource.specialty),
                    common.organization(context, context.organization),
                ],
            },
            common.summaryOptions(context, i18n, resource),
        ],
    };
};
