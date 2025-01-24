import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { type ZibLaboratoryTestResultSubstance } from './zibLaboratoryTestResultSubstance';

export const uiSchema: UiSchemaFunction<ZibLaboratoryTestResultSubstance> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const i18n = 'r3.zib_laboratory_test_result_substance';

    return {
        label: context.formatMessage(i18n),
        children: [
            {
                label: `${i18n}`,
                children: [ui.codeableConcept(`${i18n}.code`, resource.code)],
            },
        ],
    };
};
