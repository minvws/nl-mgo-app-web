import { ui, type UiSchema } from '../../ui';
import { isNonNullish } from '../../utils/isNonNullish/isNonNullish';
import { type EAfspraakAppointment } from './eAfspraakAppointment';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.eafspraak/1.0.6/files/714361/
 */
export function uiSchema(resource: EAfspraakAppointment): UiSchema {
    const profile = 'e_afspraak_appointment';

    return {
        label: resource.description,
        children: [
            {
                label: `${profile}`,
                children: [
                    ui.string(`${profile}.status.order_status`, resource.status),
                    ui.multipleValues(
                        `${profile}.specialty`,
                        resource.specialty,
                        ui.codeableConcept
                    ),
                    ui.string(`${profile}.description`, resource.description),
                    ui.dateTime(`${profile}.start`, resource.start),
                    ui.dateTime(`${profile}.end`, resource.end),
                    ui.multipleValues(
                        `${profile}.participant`,
                        resource.participant?.flatMap((x) => x.actor).filter(isNonNullish),
                        ui.reference
                    ),
                ],
            },
        ],
    };
}
