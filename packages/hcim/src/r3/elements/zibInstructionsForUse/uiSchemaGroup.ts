import { type HealthUiGroup, type HealthUiGroupFunction } from '@minvws/mgo-hcim-ui';
import { SchemaContext } from '../../../api/schemaContext/schemaContext.js';
import { zibAdministrationSchedule } from '../zibAdministrationSchedule/zibAdministrationSchedule.js';
import { type ZibInstructionsForUse } from './zibInstructionsForUse.js';

export const i18n = 'r3.zib_instructions_for_use';

/**
 *
 * @see https://decor.nictiz.nl/ad/#/zib2017bbr-/datasets/dataset/2.16.840.1.113883.2.4.3.11.60.40.3.9.12/2017-12-31T00:00:00/concept/2.16.840.1.113883.2.4.3.11.60.40.1.9.12.22504/2017-12-31T00:00:00
 */
export const uiSchemaGroup: HealthUiGroupFunction<
    ZibInstructionsForUse,
    HealthUiGroup[],
    SchemaContext
> = (resource, context) => {
    const { ui, formatMessage } = context;

    /**
     * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317236/~mappings
     */
    const hcimInstructionsForUse = {
        SequenceNumber: ui.integer(`${i18n}.sequence`, resource.sequence),
        Description: ui.string(`${i18n}.text`, resource.text),
        AdditionalInstructions: ui.codeableConcept(
            `${i18n}.additional_instruction`,
            resource.additionalInstruction
        ),
        AdministeringSchedule: zibAdministrationSchedule.uiSchemaGroup(resource.timing, context),
        AsNeeded: ui.codeableConcept(
            `${i18n}.as_needed_codeable_concept`,
            resource.asNeededCodeableConcept
        ),
        RouteOfAdministration: ui.codeableConcept(`${i18n}.route`, resource.route),
        Dose: ui.oneOfValueX(`${i18n}.dose`, resource, 'dose'),
        MaximumDose: ui.ratio(`${i18n}.max_dose_per_period`, resource.maxDosePerPeriod),
        AdministeringSpeed: ui.oneOfValueX(`${i18n}.rate`, resource, 'rate'),
    };

    return [
        {
            label: formatMessage(i18n),
            children: [
                hcimInstructionsForUse.Description,
                hcimInstructionsForUse.RouteOfAdministration,
                hcimInstructionsForUse.AdditionalInstructions,
                ...hcimInstructionsForUse.AdministeringSpeed,
                hcimInstructionsForUse.SequenceNumber,
                ...hcimInstructionsForUse.Dose,
                ...hcimInstructionsForUse.MaximumDose,
                hcimInstructionsForUse.AsNeeded,
            ],
        },
        hcimInstructionsForUse.AdministeringSchedule,
    ];
};
