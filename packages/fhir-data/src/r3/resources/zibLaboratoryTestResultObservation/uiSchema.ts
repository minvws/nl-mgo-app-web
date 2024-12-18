import { type UiSchemaFunction } from '../../../ui';
import { map } from '../../../utils';
import { type GpLaboratoryResult } from '../gpLaboratoryResult/gpLaboratoryResult';
import { uiSchemaGroup as referenceRangetUiSchema } from './elements/referenceRange/uiSchemaGroup';
import { uiSchemaGroup as relatedUiSchema } from './elements/related/uiSchemaGroup';
import { type ZibLaboratoryTestResultObservation } from './zibLaboratoryTestResultObservation';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317239
 */
export const uiSchema: UiSchemaFunction<ZibLaboratoryTestResultObservation | GpLaboratoryResult> = (
    resource,
    context
) => {
    const i18n = 'r3.zib_laboratory_test_result_observation';
    const { ui, formatMessage, setEmptyEntries } = context;

    /**
     * https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317239/~mappings
     */
    const hcimLaboratoryTestResult = {
        BasedOn: ui.reference(`${i18n}.based_on`, resource.basedOn),
        Status: ui.string(`${i18n}.status`, resource.status),
        ResultType: ui.codeableConcept(`${i18n}.result_type`, resource.resultType),
        Code: ui.codeableConcept(`${i18n}.code`, resource.code),
        Effective: ui.oneOfValueX(`${i18n}.effective`, resource, 'effective'),
        Value: ui.oneOfValueX(`${i18n}.value`, resource),
        Interpretation: ui.codeableConcept(`${i18n}.interpretation`, resource.interpretation),
        Comment: ui.string(`${i18n}.comment`, resource.comment),
        Method: ui.codeableConcept(`${i18n}.method`, resource.method),
        Specimen: ui.reference(`${i18n}.specimen`, resource.specimen),
        ReferenceRange: map(
            resource.referenceRange,
            (x) => referenceRangetUiSchema(x, context),
            true
        ).flat(),
        Related: map(resource.related, (x) => relatedUiSchema(x, context), true).flat(),
    };

    const hcimBasicElements = {
        Identifier: ui.identifier(`${i18n}.identifier`, resource.identifier),
        Subject: ui.reference(`${i18n}.subject`, resource.subject),
        Performer: ui.reference(`${i18n}.performer`, resource.performer),
    };

    return setEmptyEntries({
        label: resource.resultType?.at(0)?.coding.at(0)?.display ?? i18n,
        children: [
            {
                label: formatMessage(i18n),
                children: [
                    hcimBasicElements.Identifier,
                    hcimBasicElements.Subject,
                    ...hcimLaboratoryTestResult.Effective,
                ],
            },
            {
                label: formatMessage(`${i18n}.general_test_information`),
                children: [hcimLaboratoryTestResult.ResultType, hcimLaboratoryTestResult.Comment],
            },
            {
                label: formatMessage(`${i18n}.lab_test`),
                children: [
                    hcimLaboratoryTestResult.Code,
                    hcimLaboratoryTestResult.Method,
                    ...hcimLaboratoryTestResult.Effective,
                    ...hcimLaboratoryTestResult.Value,
                    hcimLaboratoryTestResult.Status,
                    ...ui.helpers.getChildren(hcimLaboratoryTestResult.ReferenceRange),
                    hcimLaboratoryTestResult.Interpretation,
                ],
            },
        ],
    });
};
