import { ui } from '../../../../../ui';
import { type UiSchemaGroup } from '../../../../../ui/types';
import { type Contact } from './contact';
import { map } from '../../../../../utils';
import { nlCoreHumanname, nlCoreAddress, nlCoreContactpoint } from '../../../../elements';

export function uiSchemaGroup(resource: Contact): UiSchemaGroup {
    const i18n = 'nl_core_patient.contact';
    const telecom = map(resource.telecom, nlCoreContactpoint.uiSchemaGroup, true);

    return {
        label: i18n,
        children: [
            ...nlCoreHumanname.uiSchemaGroup(resource.name).children,
            ...ui.helpers.getChildren(telecom),
            ...nlCoreAddress.uiSchemaGroup(resource.address).children,
            ui.string(`${i18n}.gender`, resource.gender),
            ui.reference(`${i18n}.organization`, resource.organization),
            ...ui.period(`${i18n}.period`, resource.period),
        ],
    };
}
