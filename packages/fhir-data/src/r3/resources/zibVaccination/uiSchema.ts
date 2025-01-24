import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { type ZibVaccination } from './zibVaccination';
import { uiSchemaGroup as actorUiSchema } from './elements/actor/uiSchemaGroup';
import { map } from '../../../utils';

export const i18n = 'r3.zib_vaccination';
export const uiSchema: UiSchemaFunction<ZibVaccination> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const practitioners = map(resource.practitioner, (x) => actorUiSchema(x, context), true);

    return {
        label: resource.vaccineCode?.coding?.[0]?.display ?? context.formatMessage(i18n),
        children: [
            {
                label: i18n,
                children: [
                    ui.codeableConcept(`${i18n}.vaccineCode`, resource.vaccineCode),
                    ui.quantity(`${i18n}.doseQuantity`, resource.dose),
                    ui.dateTime(`${i18n}.date`, resource.vaccinationDate),
                    ui.annotation(`${i18n}.note.text`, resource.note),

                    ...ui.helpers.getChildren(practitioners),
                ],
            },
        ],
    };
};
