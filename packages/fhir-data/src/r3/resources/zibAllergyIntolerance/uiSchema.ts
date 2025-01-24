import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { type ZibAllergyIntolerance } from './zibAllergyIntolerance';

export const i18n = 'r3.zib_allergy_intolerance';
export const uiSchema: UiSchemaFunction<ZibAllergyIntolerance> = (resource, context) => {
    const ui = context.ui as NonStrictUi;

    return {
        label: resource.identifier?.at(0)?.value ?? context.formatMessage(i18n),
        children: [
            {
                label: `${i18n}.group_details`,
                children: [
                    ui.identifier(`${i18n}.identifier`, resource.identifier),
                    ui.code(`${i18n}.clinical_status`, resource.clinicalStatus),
                    ui.code(`${i18n}.verification_status`, resource.verificationStatus),
                    ui.code(`${i18n}.type`, resource.type),
                    ui.code(`${i18n}.category`, resource.category),
                    ui.code(`${i18n}.criticality`, resource.criticality),
                    ui.codeableConcept(`${i18n}.code`, resource.code),
                    ui.reference(`${i18n}.patient`, resource.patient),
                ],
            },
        ],
    };
};
