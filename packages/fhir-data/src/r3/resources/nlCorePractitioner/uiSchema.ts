import { uiSchemaGroup as nlCoreAddressUiSchema } from '../../elements/nlCoreAddress/uiSchemaGroup';
import { uiSchemaGroup as nlCoreContactPointUiSchema } from '../../elements/nlCoreContactpoint/uiSchemaGroup';
import { uiSchemaGroup as humanNameUiSchema } from '../../elements/nlCoreHumanname/uiSchemaGroup';
import { ui, type UiSchema } from '../../../ui';
import { map } from '../../../utils';
import { type NlCorePractitioner } from './nlCorePractitioner';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317041
 */
export function uiSchema(resource: NlCorePractitioner): UiSchema {
    const profile = 'nl_core_practitioner';

    const address = map(resource.address, nlCoreAddressUiSchema, true);
    const name = map(resource.name, humanNameUiSchema, true);
    const telecom = map(resource.telecom, nlCoreContactPointUiSchema, true);

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
