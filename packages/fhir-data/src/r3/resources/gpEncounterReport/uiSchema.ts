import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { type GpEncounterReport } from './gpEncounterReport';
import { uiSchemaGroup as sectionUiSchema } from './elements/section/uiSchemaGroup';
import { map } from '../../../utils';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2316993
 */
export const uiSchema: UiSchemaFunction<GpEncounterReport> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const profile = 'r3.EncounterReport';

    const section = map(resource.section, (x) => sectionUiSchema(x, context), true);

    return {
        label: resource.title,
        children: [
            {
                label: `${profile}`,
                children: [
                    ui.string(`${profile}.title`, resource.title),
                    ui.string(`${profile}.status`, resource.status),
                    ui.coding(`${profile}.type`, resource.type),
                    ui.reference(`${profile}.encounter`, resource.encounter),
                    ui.dateTime(`${profile}.date`, resource.date),
                    ui.reference(`${profile}.author`, resource.author),
                ],
            },
            ...section,
        ],
    };
};
