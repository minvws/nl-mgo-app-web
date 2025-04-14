import { isNonNullish } from '@minvws/mgo-mgo-utils';
import { type HealthUiSchemaFunction } from '../../../ui';
import { valueOf } from '../../../ui/helpers/valueOf/valueOf';
import { type NonStrictUi } from '../../../ui/types';
import { type EAfspraakAppointment } from './eAfspraakAppointment';

export const i18n = 'r3.e_afspraak_appointment';

export const uiSchema: HealthUiSchemaFunction<EAfspraakAppointment> = (resource, context) => {
    const ui = context.ui as NonStrictUi;

    return {
        label: valueOf(resource.description) ?? context.formatMessage(i18n),
        children: [
            {
                label: `${i18n}`,
                children: [
                    ui.string(`${i18n}.status.order_status`, resource.status),
                    ui.codeableConcept(`${i18n}.specialty`, resource.specialty),
                    ui.string(`${i18n}.description`, resource.description),
                    ui.dateTime(`${i18n}.start`, resource.start),
                    ui.dateTime(`${i18n}.end`, resource.end),
                    ui.reference(
                        `${i18n}.participant`,
                        resource.participant?.flatMap((x) => x.actor).filter(isNonNullish)
                    ),
                ],
            },
        ],
    };
};
