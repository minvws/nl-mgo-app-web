import { ui, type UiSchema } from '../../ui';
import { type ZibVaccination } from './zibVaccination';
import { uiSchemaGroup as actorUiSchema } from './elements/actor/uiSchemaGroup';
import { map } from '../../utils';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317388
 */
export function uiSchema(resource: ZibVaccination): UiSchema {
    const practitioners = map(resource.practitioner, actorUiSchema, true);

    return {
        label: resource.vaccineCode?.[0]?.display ?? '',
        children: [
            {
                label: `Immunization`,
                children: [
                    ui.multipleValue(
                        'Immunization.vaccineCode',
                        resource.vaccineCode,
                        ui.codingWithoutSystem
                    ),
                    ui.simpleQuantity('Immunization.doseQuantity', resource.dose),
                    ui.dateTime('Immunization.date', resource.vaccinationDate),
                    ui.multipleValue(`Immunization.note.text`, resource.note, ui.annotation),

                    ...ui.helpers.getChildren(practitioners),
                ],
            },
        ],
    };
}
