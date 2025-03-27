import { type HealthUiSchemaFunction } from '../../../ui';
import { valueOf } from '../../../ui/helpers/valueOf/valueOf';
import { type NonStrictUi } from '../../../ui/types';
import { map } from '../../../utils';
import { uiSchemaGroup as sectionUiSchema } from './elements/section/uiSchemaGroup';
import { type GpEncounterReport } from './gpEncounterReport';

export const i18n = 'r3.gp_encounter_report';
export const uiSchema: HealthUiSchemaFunction<GpEncounterReport> = (resource, context) => {
    const ui = context.ui as NonStrictUi;

    const section = map(resource.section, (x) => sectionUiSchema(x, context), true);

    return {
        label: valueOf(resource.title) ?? context.formatMessage(i18n),
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
