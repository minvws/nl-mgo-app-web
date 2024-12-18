import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { type ZibLaboratoryTestResultSubstance } from './zibLaboratoryTestResultSubstance';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317246/
 */
export const uiSchema: UiSchemaFunction<ZibLaboratoryTestResultSubstance> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const i18n = 'r3.zib_laboratory_test_result_substance';

    return {
        label: `${i18n}`,
        children: [
            {
                label: `${i18n}`,
                children: [ui.codeableConcept(`${i18n}.code`, resource.code)],
            },
        ],
    };
};
