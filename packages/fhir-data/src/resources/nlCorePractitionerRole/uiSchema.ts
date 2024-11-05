import { uiSchemaGroup as nlCoreContactPointUiSchema } from '../../elements/nlCoreContactpoint/uiSchemaGroup';
import { ui, type UiSchema } from '../../ui';
import { map } from '../../utils';
import { type NlCorePractitionerRole } from './nlCorePractitionerRole';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317041
 */
export function uiSchema(resource: NlCorePractitionerRole): UiSchema {
    const profile = 'nl_core_practitionerrole';

    const telecom = map(resource.telecom, nlCoreContactPointUiSchema, true);

    return {
        label: resource.identifier?.at(0)?.value,
        children: [
            {
                label: `${profile}.group_details`,
                children: [
                    ui.multipleValues(`${profile}.identifier`, resource.identifier, ui.identifier),
                    ui.reference(`${profile}.organization`, resource.organization),
                    ui.multipleValues(
                        `${profile}.specialty`,
                        resource.specialty,
                        ui.codeableConcept
                    ),
                ],
            },
            ...telecom,
        ],
    };
}
