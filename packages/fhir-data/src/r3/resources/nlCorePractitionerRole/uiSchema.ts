import { nlCoreContactpoint } from '../../elements';
import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { map } from '../../../utils';
import { type NlCorePractitionerRole } from './nlCorePractitionerRole';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317041
 */
export const uiSchema: UiSchemaFunction<NlCorePractitionerRole> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const profile = 'r3.nl_core_practitionerrole';

    const telecom = map(
        resource.telecom,
        (x) => nlCoreContactpoint.uiSchemaGroup(x, context),
        true
    );

    return {
        label: resource.identifier?.at(0)?.value,
        children: [
            {
                label: `${profile}.group_details`,
                children: [
                    ui.identifier(`${profile}.identifier`, resource.identifier),
                    ui.reference(`${profile}.organization`, resource.organization),
                    ui.codeableConcept(`${profile}.specialty`, resource.specialty),
                ],
            },
            ...telecom,
        ],
    };
};
