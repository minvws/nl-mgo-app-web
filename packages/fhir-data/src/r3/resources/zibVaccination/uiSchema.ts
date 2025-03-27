import { type HealthUiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { map } from '../../../utils';
import { uiSchemaGroup as actorUiSchema } from './elements/actor/uiSchemaGroup';
import { type ZibVaccination } from './zibVaccination';

export const i18n = 'r3.zib_vaccination';
export const uiSchema: HealthUiSchemaFunction<ZibVaccination> = (resource, context) => {
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
                    ui.date(`${i18n}.date`, resource.vaccinationDate),
                    ui.annotation(`${i18n}.note.text`, resource.note),

                    ...ui.helpers.getChildren(practitioners),
                ],
            },
        ],
    };
};
