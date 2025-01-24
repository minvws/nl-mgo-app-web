import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { type GpEncounterReport } from './gpEncounterReport';
import { uiSchemaGroup as sectionUiSchema } from './elements/section/uiSchemaGroup';
import { map } from '../../../utils';

export const i18n = 'r3.gp_encounter_report';
export const uiSchema: UiSchemaFunction<GpEncounterReport> = (resource, context) => {
    const ui = context.ui as NonStrictUi;

    const section = map(resource.section, (x) => sectionUiSchema(x, context), true);

    return {
        label: resource.title ?? context.formatMessage(i18n),
        children: [
            {
                label: `${i18n}`,
                children: [
                    ui.string(`${i18n}.title`, resource.title),
                    ui.string(`${i18n}.status`, resource.status),
                    ui.coding(`${i18n}.type`, resource.type),
                    ui.reference(`${i18n}.encounter`, resource.encounter),
                    ui.dateTime(`${i18n}.date`, resource.date),
                    ui.reference(`${i18n}.author`, resource.author),
                ],
            },
            ...section,
        ],
    };
};
