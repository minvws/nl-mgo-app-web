import { type HealthUiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { map } from '../../../utils';
import { uiSchemaGroup as qualificationUiSchemaGroup } from './elements/qualification/uiSchemaGroup';
import { type R4NlCoreHealthProfessionalPractitioner } from './nlCoreHealthProfessionalPractitioner';

export const i18n = 'r4.nl_core_health_professional_practitioner';
export const uiSchema: HealthUiSchemaFunction<R4NlCoreHealthProfessionalPractitioner> = (
    resource,
    context
) => {
    const ui = context.ui as NonStrictUi;

    const qualification = map(
        resource.qualification,
        (x) => qualificationUiSchemaGroup(x, context),
        true
    );

    return {
        label: resource.name?.at(0)?.text?.value ?? context.formatMessage(i18n),
        children: [
            {
                label: `${i18n}.group_details`,
                children: [
                    ui.identifier(`${i18n}.identifier`, resource.identifier),
                    ui.code(`${i18n}.gender`, resource.gender),
                    ui.date(`${i18n}.birth_date`, resource.birthDate),
                    ui.codeableConcept(`${i18n}.communication`, resource.communication),
                ],
            },
            ...qualification,
        ],
    };
};
