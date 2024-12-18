import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { isNonNullish } from '../../../utils/isNonNullish/isNonNullish';
import { type EAfspraakAppointment } from './eAfspraakAppointment';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.eafspraak/1.0.6/files/714361/
 */
export const uiSchema: UiSchemaFunction<EAfspraakAppointment> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const profile = 'r3.e_afspraak_appointment';

    return {
        label: resource.description,
        children: [
            {
                label: `${profile}`,
                children: [
                    ui.string(`${profile}.status.order_status`, resource.status),
                    ui.codeableConcept(`${profile}.specialty`, resource.specialty),
                    ui.string(`${profile}.description`, resource.description),
                    ui.dateTime(`${profile}.start`, resource.start),
                    ui.dateTime(`${profile}.end`, resource.end),
                    ui.reference(
                        `${profile}.participant`,
                        resource.participant?.flatMap((x) => x.actor).filter(isNonNullish)
                    ),
                ],
            },
        ],
    };
};
