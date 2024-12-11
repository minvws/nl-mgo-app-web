import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { map } from '../../../utils';
import { nlCoreAddress, nlCoreContactpoint, nlCoreHumanname } from '../../elements';
import { type NlCorePractitioner } from './nlCorePractitioner';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317041
 */
export const uiSchema: UiSchemaFunction<NlCorePractitioner> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const profile = 'nl_core_practitioner';

    const address = map(resource.address, (x) => nlCoreAddress.uiSchemaGroup(x, context), true);
    const name = map(resource.name, (x) => nlCoreHumanname.uiSchemaGroup(x, context), true);
    const telecom = map(
        resource.telecom,
        (x) => nlCoreContactpoint.uiSchemaGroup(x, context),
        true
    );

    return {
        label: resource.name?.at(0)?.text,
        children: [
            {
                label: `${profile}.group_details`,
                children: [ui.identifier(`${profile}.identifier`, resource.identifier)],
            },
            ...address,
            ...name,
            ...telecom,
        ],
    };
};
