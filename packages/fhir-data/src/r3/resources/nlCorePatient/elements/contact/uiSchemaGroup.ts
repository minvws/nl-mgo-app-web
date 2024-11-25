import { ui } from '../../../../../ui';
import { type UiSchemaGroup } from '../../../../../ui/types';
import { type Contact } from './contact';
import { uiSchemaGroup as nameUiSchema } from '../../../../elements/nlCoreHumanname/uiSchemaGroup';
import { uiSchemaGroup as zibCoreContactPointUiSchema } from '../../../../elements/nlCoreContactpoint/uiSchemaGroup';
import { uiSchemaGroup as zibCoreAddressUiSchema } from '../../../../elements/nlCoreAddress/uiSchemaGroup';
import { map } from '../../../../../utils';

export function uiSchemaGroup(resource: Contact): UiSchemaGroup {
    const i18n = 'nl_core_patient.contact';
    const telecom = map(resource.telecom, zibCoreContactPointUiSchema, true);

    return {
        label: i18n,
        children: [
            ...nameUiSchema(resource.name).children,
            ...ui.helpers.getChildren(telecom),
            ...zibCoreAddressUiSchema(resource.address).children,
            ui.string(`${i18n}.gender`, resource.gender),
            ui.reference(`${i18n}.organization`, resource.organization),
            ...ui.period(`${i18n}.period`, resource.period),
        ],
    };
}
