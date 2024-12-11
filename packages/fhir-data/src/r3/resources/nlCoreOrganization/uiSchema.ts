import { nlCoreAddress, nlCoreContactpoint } from '../../elements';
import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { map } from '../../../utils';
import { type NlCoreOrganization } from './nlCoreOrganization';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317033
 */
export const uiSchema: UiSchemaFunction<NlCoreOrganization> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const profile = 'nl_core_organization';

    const address = map(
        resource.address,
        (x) => nlCoreAddress.uiSchemaGroup(x, context),
        true
    ).flat();
    const telecom = map(
        resource.telecom,
        (x) => nlCoreContactpoint.uiSchemaGroup(x, context),
        true
    ).flat();

    return {
        label: resource.name,
        children: [
            {
                label: `${profile}.group_details`,
                children: [
                    ui.identifier(`${profile}.identifier`, resource.identifier),
                    ui.string(`${profile}.name`, resource.name),
                    ui.codeableConcept(
                        `${profile}.department_specialty`,
                        resource.departmentSpecialty
                    ),
                    ui.codeableConcept(`${profile}.organization_type`, resource.organizationType),
                ],
            },
            ...address,
            ...telecom,
        ],
    };
};
