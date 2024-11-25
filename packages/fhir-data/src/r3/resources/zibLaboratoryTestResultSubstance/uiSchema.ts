import { ui, type UiSchema } from '../../../ui';
import { type ZibLaboratoryTestResultSubstance } from './zibLaboratoryTestResultSubstance';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317246/
 */
export function uiSchema(resource: ZibLaboratoryTestResultSubstance): UiSchema {
    const i18n = 'zib_laboratory_test_result_substance';

    return {
        label: `${i18n}`,
        children: [
            {
                label: `${i18n}`,
                children: [ui.codeableConcept(`${i18n}.code`, resource.code)],
            },
        ],
    };
}
