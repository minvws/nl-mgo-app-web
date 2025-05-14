import { type HealthUiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { map } from '../../../utils';
import { nlCoreAddress, nlCoreContactpoint, nlCoreHumanname } from '../../elements';
import { type NlCorePractitioner } from './nlCorePractitioner';

export const i18n = 'r3.nl_core_practitioner';
export const uiSchema: HealthUiSchemaFunction<NlCorePractitioner> = (resource, context) => {
    const ui = context.ui as NonStrictUi;

    const address = map(resource.address, (x) => nlCoreAddress.uiSchemaGroup(x, context), true);
    const name = map(resource.name, (x) => nlCoreHumanname.uiSchemaGroup(x, context), true);
    const telecom = map(
        resource.telecom,
        (x) => nlCoreContactpoint.uiSchemaGroup(x, context),
        true
    );

    return {
        label: context.formatMessage(i18n),
        children: [
            {
                label: `${i18n}.group_details`,
                children: [ui.identifier(`${i18n}.identifier`, resource.identifier)],
            },
            ...address,
            ...name,
            ...telecom,
        ],
    };
};
