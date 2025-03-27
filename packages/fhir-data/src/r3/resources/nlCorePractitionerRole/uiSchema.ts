import { type HealthUiSchemaFunction } from '../../../ui';
import { valueOf } from '../../../ui/helpers/valueOf/valueOf';
import { type NonStrictUi } from '../../../ui/types';
import { map } from '../../../utils';
import { nlCoreContactpoint } from '../../elements';
import { type NlCorePractitionerRole } from './nlCorePractitionerRole';

export const i18n = 'r3.nl_core_practitionerrole';
export const uiSchema: HealthUiSchemaFunction<NlCorePractitionerRole> = (resource, context) => {
    const ui = context.ui as NonStrictUi;

    const telecom = map(
        resource.telecom,
        (x) => nlCoreContactpoint.uiSchemaGroup(x, context),
        true
    );

    return {
        label: valueOf(resource.identifier?.at(0)) ?? context.formatMessage(i18n),
        children: [
            {
                label: `${i18n}.group_details`,
                children: [
                    ui.identifier(`${i18n}.identifier`, resource.identifier),
                    ui.reference(`${i18n}.organization`, resource.organization),
                    ui.codeableConcept(`${i18n}.specialty`, resource.specialty),
                ],
            },
            ...telecom,
        ],
    };
};
