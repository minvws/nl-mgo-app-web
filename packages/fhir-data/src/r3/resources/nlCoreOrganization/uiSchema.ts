import { type HealthUiSchemaFunction } from '../../../ui';
import { valueOf } from '../../../ui/helpers/valueOf/valueOf';
import { type NonStrictUi } from '../../../ui/types';
import { map } from '../../../utils';
import { nlCoreAddress, nlCoreContactpoint } from '../../elements';
import { type NlCoreOrganization } from './nlCoreOrganization';

export const i18n = 'r3.nl_core_organization';
export const uiSchema: HealthUiSchemaFunction<NlCoreOrganization> = (resource, context) => {
    const ui = context.ui as NonStrictUi;

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
        label: valueOf(resource.name) ?? context.formatMessage(i18n),
        children: [
            {
                label: `${i18n}.group_details`,
                children: [
                    ui.identifier(`${i18n}.identifier`, resource.identifier),
                    ui.string(`${i18n}.name`, resource.name),
                    ui.codeableConcept(
                        `${i18n}.department_specialty`,
                        resource.departmentSpecialty
                    ),
                    ui.codeableConcept(`${i18n}.organization_type`, resource.organizationType),
                ],
            },
            ...address,
            ...telecom,
        ],
    };
};
