import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { map } from '../../../utils';
import { uiSchemaGroup as evidenceUiSchema } from './elements/evidence/uiSchemaGroup';
import { uiSchemaGroup as stageUiSchema } from './elements/stage/uiSchemaGroup';
import { type ZibProblem } from './zibProblem';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317327
 */
export const uiSchema: UiSchemaFunction<ZibProblem> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const i18n = 'zib_problem';

    const stage = stageUiSchema(resource.stage, context);
    const evidence = map(resource.evidence, (x) => evidenceUiSchema(x, context), true);
    return {
        label: resource.code?.coding?.at(0)?.display,
        children: [
            {
                label: `${i18n}.group_general_information`,
                children: [
                    ui.code(`${i18n}.clinicalStatus`, resource.clinicalStatus),
                    ui.codeableConcept(`${i18n}.category`, resource.category),
                    ui.dateTime(`${i18n}.onsetDateTime`, resource.onsetDateTime),
                    ui.dateTime(`${i18n}.abatementDateTime`, resource.abatementDateTime),
                    ui.codeableConcept(`${i18n}.bodySite`, resource.bodySite),
                    ui.annotation(`${i18n}.note`, resource.note),
                ],
            },
            {
                label: `${i18n}.group_others`,
                children: [
                    ui.identifier(`${i18n}.identifier`, resource.identifier),
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
};
