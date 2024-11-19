import { ui, type UiSchema } from '../../../ui';
import { map } from '../../../utils';
import { type NlCoreVaccinationEvent } from './nlCoreVaccinationEvent';
import { uiSchemaGroup as protocolAppliedUiSchema } from './elements/protocolApplied/uiSchemaGroup';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.8.0-beta.1/files/1946266
 */
export function uiSchema(resource: NlCoreVaccinationEvent): UiSchema {
    const profile = 'nl_core_vaccination_event';

    const protocolApplied = map(resource.protocolApplied, protocolAppliedUiSchema, true);

    return {
        label: resource.vaccineCode?.at(0)?.display,
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
                    ui.reference(`${profile}.patient`, resource.patient, { summary: true }),
                    ui.dateTime(`${profile}.occurrence_date_time`, resource.occurrenceDateTime),
                    ui.codeableConcept(`${profile}.site`, resource.site),
                    ui.codeableConcept(`${profile}.route`, resource.route),
                    ui.simpleQuantity(`${profile}.dose_quantity`, resource.doseQuantity),
                    ui.multipleValues(
                        `${profile}.administrator`,
                        resource.administrator,
                        ui.reference
                    ),
                    ui.multipleValues(`${profile}.note`, resource.note, ui.annotation),
                    ui.multipleValues(
                        `${profile}.vaccination_indication`,
                        resource.vaccinationIndication,
                        ui.codeableConcept
                    ),
                    ui.multipleValues(
                        `${profile}.vaccination_motive`,
                        resource.vaccinationMotive,
                        ui.codeableConcept
                    ),
                    ...ui.helpers.getChildren(protocolApplied),
                ],
            },
        ],
    };
}
