import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { uiSchemaGroup as focalDeviceUiSchema } from './elements/focalDevice/uiSchemaGroup';
import { uiSchemaGroup as performerUiSchema } from './elements/performer/uiSchemaGroup';
import { map } from '../../../utils';
import { type ZibProcedure } from './zibProcedure';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317388
 */
export const uiSchema: UiSchemaFunction<ZibProcedure> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const profile = 'r3.zib_procedure';
    const focalDevices = map(resource.focalDevice, (x) => focalDeviceUiSchema(x, context), true);
    const performers = map(resource.performer, (x) => performerUiSchema(x, context), true);

    return {
        label: resource.code?.coding?.at(0)?.display,
        children: [
            {
                label: `${profile}`,
                children: [
                    ...ui.period(`${profile}.performed_period`, resource.performedPeriod),
                    ui.codeableConcept(`${profile}.body_site`, resource.bodySite),
                    ui.codeableConcept(
                        `${profile}.bodySite.extension:ProcedureLaterality`,
                        resource.bodySiteQualifier
                    ),
                    ui.reference(`${profile}.reason_reference`, resource.reasonReference),
                    ui.codeableConcept(`${profile}.code`, resource.code),
                    ui.codeableConcept(`${profile}.procedure_method`, resource.procedureMethod),
                    ...ui.helpers.getChildren(focalDevices),
                    ui.reference(`${profile}.location`, resource.location),
                    ...ui.helpers.getChildren(performers),
                    ui.reference(`${profile}.subject`, resource.subject),
                ],
            },
        ],
    };
};
