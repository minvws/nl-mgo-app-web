import { ui, type UiSchema } from '../../../ui';
import { map } from '../../../utils';
import { uiSchemaGroup as evidenceUiSchema } from './elements/evidence/uiSchemaGroup';
import { uiSchemaGroup as stageUiSchema } from './elements/stage/uiSchemaGroup';
import { type ZibProblem } from './zibProblem';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317327
 */
export function uiSchema(resource: ZibProblem): UiSchema {
    const i18n = 'zib_problem';

    const stage = stageUiSchema(resource.stage);
    const evidence = map(resource.evidence, evidenceUiSchema) ?? [];
    return {
        label: resource.code?.at(0)?.display,
        children: [
            {
                label: `${i18n}.group_general_information`,
                children: [
                    ui.code(`${i18n}.clinicalStatus`, resource.clinicalStatus),
                    ui.multipleValues(`${i18n}.category`, resource.category, ui.codeableConcept),
                    ui.dateTime(`${i18n}.onsetDateTime`, resource.onsetDateTime),
                    ui.dateTime(`${i18n}.abatementDateTime`, resource.abatementDateTime),
                    ui.multipleValues(`${i18n}.bodySite`, resource.bodySite, ui.codeableConcept),
                    ui.multipleValues(`${i18n}.note`, resource.note, ui.annotation),
                ],
            },
            {
                label: `${i18n}.group_others`,
                children: [
                    ui.multipleValues(`${i18n}.identifier`, resource.identifier, ui.identifier),
                    ui.code(`${i18n}.verificationStatus`, resource.verificationStatus),
                    ui.codeableConcept(`${i18n}.severity`, resource.severity),
                    ui.codeableConcept(`${i18n}.code`, resource.code),
                    ui.reference(`${i18n}.subject`, resource.subject),
                    ui.reference(`${i18n}.context`, resource.context),
                    ui.dateTime(`${i18n}.assertedDate`, resource.assertedDate),
                    ui.reference(`${i18n}.asserter`, resource.asserter),
                ],
            },
            stage,
            ...evidence,
        ],
    };
}
