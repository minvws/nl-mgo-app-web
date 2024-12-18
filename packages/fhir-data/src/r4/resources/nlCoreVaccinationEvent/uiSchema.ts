import { type UiSchemaFunction } from '../../../ui';
import { map } from '../../../utils';
import { uiSchemaGroup as protocolAppliedUiSchema } from './elements/protocolApplied/uiSchemaGroup';
import { type R4NlCoreVaccinationEvent } from './nlCoreVaccinationEvent';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.8.0-beta.1/files/1946266
 */
export const uiSchema: UiSchemaFunction<R4NlCoreVaccinationEvent> = (resource, context) => {
    const profile = 'r4.nl_core_vaccination_event';
    const { ui, formatMessage, setEmptyEntries } = context;

    /**
     * https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.8.0-beta.1/files/1946266/~mappings
     */
    const artDecorDatasetVaccinationImmunization = {
        PharmaceuticalProduct: ui.reference(
            `${profile}.pharmaceutical_product`,
            resource.pharmaceuticalProduct
        ),
        Identifier: ui.identifier(`${profile}.identifier`, resource.identifier),
        Status: ui.string(`${profile}.status`, resource.status),
        Patient: ui.reference(`${profile}.patient`, resource.patient),
        Location: ui.reference(`${profile}.location`, resource.location),
        Route: ui.codeableConcept(`${profile}.route`, resource.route),
        Site: ui.codeableConcept(`${profile}.site`, resource.site),
        Performer: map(resource.performer, (x) => ui.reference(`${profile}.performer`, x), true),
        VaccinationIndication: ui.codeableConcept(
            `${profile}.vaccination_indication`,
            resource.vaccinationIndication
        ),
        VaccinationMotive: ui.codeableConcept(
            `${profile}.vaccination_motive`,
            resource.vaccinationMotive
        ),
        ProtocolApplied: map(
            resource.protocolApplied,
            (x) => protocolAppliedUiSchema(x, context),
            true
        ),
    };

    const zibVaccinationv4 = {
        VaccineCode: ui.codeableConcept(`${profile}.vaccine_code`, resource.vaccineCode),
        OccurrenceDateTime: ui.dateTime(
            `${profile}.occurrence_date_time`,
            resource.occurrenceDateTime
        ),
        DoseQuantity: ui.quantity(`${profile}.dose_quantity`, resource.doseQuantity),
        Note: ui.annotation(`${profile}.note`, resource.note),
    };

    return setEmptyEntries({
        label: resource.vaccineCode?.coding?.at(0)?.display,
        children: [
            {
                label: formatMessage(`fhir.group_general_info`),
                children: [
                    zibVaccinationv4.VaccineCode,
                    zibVaccinationv4.DoseQuantity,
                    artDecorDatasetVaccinationImmunization.Patient,
                    zibVaccinationv4.OccurrenceDateTime,
                    zibVaccinationv4.Note,
                ],
            },
            {
                label: formatMessage(`${profile}.performed_by`),
                children: [
                    ...artDecorDatasetVaccinationImmunization.Performer,
                    artDecorDatasetVaccinationImmunization.Location,
                ],
            },
            {
                label: formatMessage(`${profile}.extra`),
                children: [
                    artDecorDatasetVaccinationImmunization.VaccinationMotive,
                    ...ui.helpers.getChildren(
                        artDecorDatasetVaccinationImmunization.ProtocolApplied
                    ),
                    artDecorDatasetVaccinationImmunization.Route,
                    artDecorDatasetVaccinationImmunization.Site,
                ],
            },
        ],
    });
};
