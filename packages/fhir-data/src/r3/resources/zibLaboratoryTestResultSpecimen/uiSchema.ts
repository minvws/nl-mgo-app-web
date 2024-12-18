import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { map } from '../../../utils';
import { type ZibLaboratoryTestResultSpecimen } from './zibLaboratoryTestResultSpecimen';
import { uiSchemaGroup as containerUiSchema } from './elements/container/uiSchemaGroup';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317241
 */
export const uiSchema: UiSchemaFunction<ZibLaboratoryTestResultSpecimen> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const profile = 'r3.zib_laboratory_test_result_specimen';

    const container = map(resource.container, (x) => containerUiSchema(x, context), true);

    return {
        label: resource.type?.coding?.[0]?.display ?? `${profile}`,
        children: [
            {
                label: `${profile}`,
                children: [
                    ui.identifier(`${profile}.identifier`, resource.identifier),
                    ...ui.helpers.getChildren(container),
                    ui.codeableConcept(`${profile}.type`, resource.type),
                    ui.quantity(`${profile}.quantity`, resource.collection.quantity),
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
                    ui.annotation(`${profile}.note`, resource.note),
                ],
            },
        ],
    };
};
