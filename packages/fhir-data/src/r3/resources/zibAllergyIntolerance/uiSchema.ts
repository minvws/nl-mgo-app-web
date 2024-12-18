import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { type ZibAllergyIntolerance } from './zibAllergyIntolerance';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317138
 */
export const uiSchema: UiSchemaFunction<ZibAllergyIntolerance> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const i18n = 'r3.zib_allergy_intolerance';

    return {
        label: resource.identifier?.at(0)?.value,
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
