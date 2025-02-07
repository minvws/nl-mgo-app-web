import { type HealthUiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { map } from '../../../utils';
import { uiSchemaGroup as containerUiSchema } from './elements/container/uiSchemaGroup';
import { type ZibLaboratoryTestResultSpecimen } from './zibLaboratoryTestResultSpecimen';

export const i18n = 'r3.zib_laboratory_test_result_specimen';
export const uiSchema: HealthUiSchemaFunction<ZibLaboratoryTestResultSpecimen> = (
    resource,
    context
) => {
    const ui = context.ui as NonStrictUi;

    const container = map(resource.container, (x) => containerUiSchema(x, context), true);

    return {
        label: resource.type?.coding?.[0]?.display ?? context.formatMessage(i18n),
        children: [
            {
                label: i18n,
                children: [
                    ui.identifier(`${i18n}.identifier`, resource.identifier),
                    ...ui.helpers.getChildren(container),
                    ui.codeableConcept(`${i18n}.type`, resource.type),
                    ui.quantity(`${i18n}.quantity`, resource.collection.quantity),
                    ...ui.oneOfValueX(`${i18n}.collected`, resource.collection, 'collected'),
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
                    ui.annotation(`${i18n}.note`, resource.note),
                ],
            },
        ],
    };
};
