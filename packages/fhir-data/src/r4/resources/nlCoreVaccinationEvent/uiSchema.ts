import { type UiSchemaFunction } from '../../../ui';
import { map } from '../../../utils';
import { type NlCoreVaccinationEvent } from './nlCoreVaccinationEvent';
import { uiSchemaGroup as protocolAppliedUiSchema } from './elements/protocolApplied/uiSchemaGroup';
import { type NonStrictUi } from '../../../ui/types';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.8.0-beta.1/files/1946266
 */
export const uiSchema: UiSchemaFunction<NlCoreVaccinationEvent> = (resource, context) => {
    const profile = 'nl_core_vaccination_event';
    const ui = context.ui as NonStrictUi;

    const protocolApplied = map(
        resource.protocolApplied,
        (x) => protocolAppliedUiSchema(x, context),
        true
    ).flat();

    return {
        label: resource.vaccineCode?.coding?.at(0)?.display,
        children: [
            {
                label: `${profile}.group_details`,
                children: [
                    ui.reference(
                        `${profile}.pharmaceutical_product`,
                        resource.pharmaceuticalProduct
                    ),
                    ui.string(`${profile}.status`, resource.status),
                    ui.codeableConcept(`${profile}.vaccine_code`, resource.vaccineCode),
                    ui.reference(`${profile}.patient`, resource.patient),
                    ui.dateTime(`${profile}.occurrence_date_time`, resource.occurrenceDateTime),
                    ui.codeableConcept(`${profile}.site`, resource.site),
                    ui.codeableConcept(`${profile}.route`, resource.route),
                    ui.quantity(`${profile}.dose_quantity`, resource.doseQuantity),
                    ui.reference(`${profile}.administrator`, resource.administrator),
                    ui.annotation(`${profile}.note`, resource.note),
                    ui.codeableConcept(
                        `${profile}.vaccination_indication`,
                        resource.vaccinationIndication
                    ),
                    ui.codeableConcept(`${profile}.vaccination_motive`, resource.vaccinationMotive),
                    ...ui.helpers.getChildren(protocolApplied),
                ],
            },
        ],
    };
};
