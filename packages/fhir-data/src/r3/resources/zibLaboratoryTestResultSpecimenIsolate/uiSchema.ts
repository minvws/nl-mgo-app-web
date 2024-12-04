import { ui, type UiSchema } from '../../../ui';
import { map } from '../../../utils';
import { type ZibLaboratoryTestResultSpecimenIsolate } from './zibLaboratoryTestResultSpecimenIsolate';
import { uiSchemaGroup as containerUiSchema } from './elements/container/uiSchemaGroup';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317243
 */
export function uiSchema(resource: ZibLaboratoryTestResultSpecimenIsolate): UiSchema {
    const profile = 'zib_laboratory_test_result_specimen_isolate';

    const container = map(resource.container, containerUiSchema, true);

    return {
        label: resource.type?.coding?.[0]?.display ?? `${profile}`,
        children: [
            {
                label: `${profile}`,
                children: [
                    ui.multipleValues(`${profile}.identifier`, resource.identifier, ui.identifier),
                    ...ui.helpers.getChildren(container),
                    ui.codeableConcept(`${profile}.type`, resource.type),
                    ui.simpleQuantity(`${profile}.quantity`, resource.collection.quantity),
                    ...ui.oneOfValueX(`${profile}.collected`, resource.collection, 'collected'),
                    ui.dateTime(`${profile}.received_time`, resource.receivedTime),
                    ui.codeableConcept(`${profile}.collection.method`, resource.collection.method),
                    ui.codeableConcept(`${profile}.body_site`, resource.collection.bodySite.value),
                    ui.codeableConcept(
                        `${profile}.body_site.laterality`,
                        resource.collection.bodySite.laterality
                    ),
                    ui.codeableConcept(
                        `${profile}.body_site.morphology`,
                        resource.collection.bodySite.morphology
                    ),
                    ui.reference(`${profile}.subject`, resource.subject),
                    ui.multipleValues(`${profile}.note`, resource.note, ui.annotation),
                ],
            },
        ],
    };
}
