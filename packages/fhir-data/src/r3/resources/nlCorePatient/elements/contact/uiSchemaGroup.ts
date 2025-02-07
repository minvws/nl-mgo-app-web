import { type HealthUiGroupFunction, type NonStrictUi } from '../../../../../ui/types';
import { isNonNullish, map } from '../../../../../utils';
import { nlCoreAddress, nlCoreContactpoint, nlCoreHumanname } from '../../../../elements';
import { type Contact } from './contact';

export const uiSchemaGroup: HealthUiGroupFunction<Contact> = (resource, context) => {
    const i18n = 'r3.nl_core_patient.contact';
    const ui = context.ui as NonStrictUi;
    const telecom = map(
        resource.telecom,
        (x) => nlCoreContactpoint.uiSchemaGroup(x, context),
        true
    ).flat();

    return {
        label: i18n,
        children: [
            ...nlCoreHumanname.uiSchemaGroup(resource.name, context).children,
            ...ui.helpers.getChildren(telecom),
            ...nlCoreAddress.uiSchemaGroup(resource.address, context).children,
            ui.code(`${i18n}.gender`, resource.gender),
            ui.reference(`${i18n}.organization`, resource.organization),
            ...ui.period(`${i18n}.period`, resource.period),
        ].filter(isNonNullish),
    };
};
