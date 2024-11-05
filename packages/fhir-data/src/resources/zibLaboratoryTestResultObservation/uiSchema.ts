import { ui, type UiSchema } from '../../ui';
import { map } from '../../utils';
import { type ZibLaboratoryTestResultObservation } from './zibLaboratoryTestResultObservation';
import { uiSchemaGroup as relatedUiSchema } from './elements/related/uiSchemaGroup';
import { uiSchemaGroup as referenceRangetUiSchema } from './elements/referenceRange/uiSchemaGroup';
import { type GpLaboratoryResult } from '../gpLaboratoryResult/gpLaboratoryResult';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317239
 */
export function uiSchema(
    resource: ZibLaboratoryTestResultObservation | GpLaboratoryResult
): UiSchema {
    const i18n = 'zib_laboratory_test_result_observation';

    const related = map(resource.related, relatedUiSchema, true);
    const referenceRange = map(resource.referenceRange, referenceRangetUiSchema, true);
    const title = resource.category?.[0]?.[0]?.display ?? `${i18n}`;
    const effective =
        typeof resource.effective === 'string'
            ? [ui.dateTime(`${i18n}.effective`, resource.effective)]
            : ui.period(`${i18n}.effective`, resource.effective);

    return {
        label: title,
        children: [
            {
                label: `${i18n}`,
                children: [
                    ui.multipleValues(`${i18n}.identifier`, resource.identifier, ui.identifier),
                    ui.reference(`${i18n}.specimen`, resource.specimen),
                    ui.codeableConcept(
                        'zib_laboratory_test_result_diagnostic_report.code',
                        resource.code
                    ),
                    ui.string(
                        'zib_laboratory_test_result_diagnostic_report.status',
                        resource.status
                    ),
                    ui.string(`${i18n}.comment`, resource.comment),
                    ui.multipleValues(`${i18n}.result_type`, resource.category, ui.codeableConcept),
                    ...ui.helpers.getChildren(related),
                    ui.multipleValues(`${i18n}.based_on`, resource.basedOn, ui.reference),
                ],
            },
            {
                label: `${i18n}.test`,
                children: [
                    ui.codeableConcept(`${i18n}.code`, resource.code),
                    ui.codeableConcept(`${i18n}.method`, resource.method),
                    ...effective,
                    ui.simpleQuantity(`${i18n}.value`, resource.result),
                    ui.string(`${i18n}.status`, resource.status),
                    ...ui.helpers.getChildren(referenceRange),
                    ui.codeableConcept(
                        `${i18n}.interpretation.interpretatie_vlaggen_codelijst`,
                        resource.interpretation
                    ),
                    ui.string(`${i18n}.comment`, resource.comment),
                ],
            },
        ],
    };
}
