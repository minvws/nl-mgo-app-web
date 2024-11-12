import { ui, type UiSchema } from '../../../ui';
import { type GpEncounterReport } from './gpEncounterReport';
import { uiSchemaGroup as sectionUiSchema } from './elements/section/uiSchemaGroup';
import { map } from '../../../utils';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2316993
 */
export function uiSchema(resource: GpEncounterReport): UiSchema {
    const profile = 'EncounterReport';

    const section = map(resource.section, sectionUiSchema, true);

    return {
        label: resource.title,
        children: [
            {
                label: `${profile}`,
                children: [
                    ui.string(`${profile}.title`, resource.title),
                    ui.string(`${profile}.status`, resource.status),
                    ui.multipleValues(`${profile}.type`, resource.type, ui.coding),
                    ui.reference(`${profile}.encounter`, resource.encounter),
                    ui.dateTime(`${profile}.date`, resource.date),
                    ui.multipleValues(`${profile}.author`, resource.author, ui.reference),
                ],
            },
            ...section,
        ],
    };
}
