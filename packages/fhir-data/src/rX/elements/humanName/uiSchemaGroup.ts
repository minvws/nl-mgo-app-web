import { type Nullable } from '../../../types/Nullable';
import { ui } from '../../../ui';
import { type UiSchemaGroup } from '../../../ui/types';
import { type MgoHumanname } from './humanName';

export function uiSchemaGroup(resource: Nullable<MgoHumanname>): UiSchemaGroup {
    const i18n = 'human_name';

    return {
        label: i18n,
        children: [
            ui.string(`${i18n}.family`, resource?.family),
            ui.multipleValues(`${i18n}.given`, resource?.given, ui.string),
            ...ui.period(`${i18n}.period`, resource?.period),
            ui.multipleValues(`${i18n}.prefix`, resource?.prefix, ui.string),
            ui.multipleValues(`${i18n}.suffix`, resource?.suffix, ui.string),
            ui.string(`${i18n}.use`, resource?.use),
            ui.string(`${i18n}.text`, resource?.text),
        ],
    };
}
