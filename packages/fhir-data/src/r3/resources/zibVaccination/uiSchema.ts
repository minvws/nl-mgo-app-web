import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { type ZibVaccination } from './zibVaccination';
import { uiSchemaGroup as actorUiSchema } from './elements/actor/uiSchemaGroup';
import { map } from '../../../utils';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317388
 */
export const uiSchema: UiSchemaFunction<ZibVaccination> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const practitioners = map(resource.practitioner, (x) => actorUiSchema(x, context), true);

    return {
        label: resource.vaccineCode?.coding?.[0]?.display ?? '',
        children: [
            {
                label: `Immunization`,
                children: [
                    ui.codeableConcept('Immunization.vaccineCode', resource.vaccineCode),
                    ui.quantity('Immunization.doseQuantity', resource.dose),
                    ui.dateTime('Immunization.date', resource.vaccinationDate),
                    ui.annotation(`Immunization.note.text`, resource.note),

                    ...ui.helpers.getChildren(practitioners),
                ],
            },
        ],
    };
};
