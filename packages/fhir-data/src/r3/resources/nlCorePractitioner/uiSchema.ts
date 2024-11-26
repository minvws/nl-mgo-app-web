import { ui, type UiSchema } from '../../../ui';
import { map } from '../../../utils';
import { nlCoreAddress, nlCoreContactpoint, nlCoreHumanname } from '../../elements';
import { type NlCorePractitioner } from './nlCorePractitioner';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317041
 */
export function uiSchema(resource: NlCorePractitioner): UiSchema {
    const profile = 'nl_core_practitioner';

    const address = map(resource.address, nlCoreAddress.uiSchemaGroup, true);
    const name = map(resource.name, nlCoreHumanname.uiSchemaGroup, true);
    const telecom = map(resource.telecom, nlCoreContactpoint.uiSchemaGroup, true);

    return {
        label: resource.name?.at(0)?.text,
        children: [
            {
                label: `${profile}.group_details`,
                children: [
                    ui.multipleValues(`${profile}.identifier`, resource.identifier, ui.identifier),
                ],
            },
            ...address,
            ...name,
            ...telecom,
        ],
    };
}
