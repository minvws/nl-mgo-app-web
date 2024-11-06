import { uiSchemaGroup as nlCoreAddressUiSchema } from '../../elements/nlCoreAddress/uiSchemaGroup';
import { uiSchemaGroup as nlCoreContactPointUiSchema } from '../../elements/nlCoreContactpoint/uiSchemaGroup';
import { ui, type UiSchema } from '../../ui';
import { map } from '../../utils';
import { type NlCoreOrganization } from './nlCoreOrganization';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317033
 */
export function uiSchema(resource: NlCoreOrganization): UiSchema {
    const profile = 'nl_core_organization';

    const address = map(resource.address, nlCoreAddressUiSchema, true);
    const telecom = map(resource.telecom, nlCoreContactPointUiSchema, true);

    return {
        label: resource.name,
        children: [
            {
                label: `${profile}.group_details`,
                children: [
                    ui.multipleValues(`${profile}.identifier`, resource.identifier, ui.identifier),
                    ui.string(`${profile}.name`, resource.name),
                    ui.multipleValues(
                        `${profile}.department_specialty`,
                        resource.departmentSpecialty,
                        ui.codeableConcept
                    ),
                    ui.multipleValues(
                        `${profile}.organization_type`,
                        resource.organizationType,
                        ui.codeableConcept
                    ),
                ],
            },
            ...address,
            ...telecom,
        ],
    };
}
