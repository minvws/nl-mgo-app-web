import { ui, type UiSchema } from '../../../ui';
import { map } from '../../../utils';
import { type ZibLaboratoryTestResultSpecimen } from './zibLaboratoryTestResultSpecimen';
import { uiSchemaGroup as containerUiSchema } from './elements/container/uiSchemaGroup';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317241
 */
export function uiSchema(resource: ZibLaboratoryTestResultSpecimen): UiSchema {
    const i18n = 'zib_laboratory_test_result_specimen';

    const container = map(resource.container, containerUiSchema, true);

    const collectionCollected =
        typeof resource.collection.collected === 'string'
            ? [ui.dateTime(`${i18n}.collection.collected_date_time`, resource.collection.collected)]
            : ui.period(`${i18n}.collection.collected_period`, resource.collection.collected);

    return {
        label: resource.type?.[0]?.display ?? `${i18n}`,
        children: [
            {
                label: `${i18n}`,
                children: [
                    ui.multipleValues(`${i18n}.identifier`, resource.identifier, ui.identifier),
                    ...ui.helpers.getChildren(container),
                    ui.codeableConcept(`${i18n}.type`, resource.type),
                    ui.string('zib_laboratory_test_result_substance.code', resource.substance),
                    ui.simpleQuantity(`${i18n}.quantity`, resource.collection.quantity),
                    ...collectionCollected,
                    ui.dateTime(`${i18n}.received_time`, resource.receivedTime),
                    ui.codeableConcept(`${i18n}.collection.method`, resource.collection.method),
                    ui.codeableConcept(`${i18n}.body_site`, resource.collection.bodySite.value),
                    ui.codeableConcept(
                        `${i18n}.body_site.laterality`,
                        resource.collection.bodySite.laterality
                    ),
                    ui.codeableConcept(
                        `${i18n}.body_site.morphology`,
                        resource.collection.bodySite.morphology
                    ),
                    ui.reference(`${i18n}.subject`, resource.subject),
                    ui.multipleValues(`${i18n}.note`, resource.note, ui.annotation),
                ],
            },
        ],
    };
}
