import { type HealthUiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { map } from '../../../utils';
import { uiSchemaGroup as focalDeviceUiSchema } from './elements/focalDevice/uiSchemaGroup';
import { uiSchemaGroup as performerUiSchema } from './elements/performer/uiSchemaGroup';
import { type ZibProcedure } from './zibProcedure';

export const i18n = 'r3.zib_procedure';
export const uiSchema: HealthUiSchemaFunction<ZibProcedure> = (resource, context) => {
    const ui = context.ui as NonStrictUi;

    const focalDevices = map(resource.focalDevice, (x) => focalDeviceUiSchema(x, context), true);
    const performers = map(resource.performer, (x) => performerUiSchema(x, context), true);

    return {
        label: resource.code?.coding?.at(0)?.display ?? context.formatMessage(i18n),
        children: [
            {
                label: `${i18n}`,
                children: [
                    ...ui.period(`${i18n}.performed_period`, resource.performedPeriod),
                    ui.codeableConcept(`${i18n}.body_site`, resource.bodySite),
                    ui.codeableConcept(
                        `${i18n}.bodySite.extension:ProcedureLaterality`,
                        resource.bodySiteQualifier
                    ),
                    ui.reference(`${i18n}.reason_reference`, resource.reasonReference),
                    ui.codeableConcept(`${i18n}.code`, resource.code),
                    ui.codeableConcept(`${i18n}.procedure_method`, resource.procedureMethod),
                    ...ui.helpers.getChildren(focalDevices),
                    ui.reference(`${i18n}.location`, resource.location),
                    ...ui.helpers.getChildren(performers),
                    ui.reference(`${i18n}.subject`, resource.subject),
                ],
            },
        ],
    };
};
