import { capitalize } from 'lodash';
import { type HealthUiSchemaFunction } from '../../../ui';
import { type UiHelperContext } from '../../../ui/context';
import { map } from '../../../utils';
import { uiSchemaGroup as protocolAppliedUiSchema } from './elements/protocolApplied/uiSchemaGroup';
import { type R4NlCoreVaccinationEvent } from './nlCoreVaccinationEvent';

export const i18n = 'r4.nl_core_vaccination_event';

export function getLabel(resource: R4NlCoreVaccinationEvent, context: UiHelperContext) {
    return capitalize(resource.vaccineCode?.coding?.at(0)?.display) || context.formatMessage(i18n);
}

export const uiSchema: HealthUiSchemaFunction<R4NlCoreVaccinationEvent> = (resource, context) => {
    const { ui, formatMessage } = context;

    /**
     * https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.8.0-beta.1/files/1946266/~mappings
     */
    const artDecorDatasetVaccinationImmunization = {
        PharmaceuticalProduct: ui.reference(
            `${i18n}.pharmaceutical_product`,
            resource.pharmaceuticalProduct
        ),
        Identifier: ui.identifier(`${i18n}.identifier`, resource.identifier),
        Status: ui.string(`${i18n}.status`, resource.status),
        Patient: ui.reference(`${i18n}.patient`, resource.patient),
        Location: ui.reference(`${i18n}.location`, resource.location),
        Route: ui.codeableConcept(`${i18n}.route`, resource.route),
        Site: ui.codeableConcept(`${i18n}.site`, resource.site),
        Performer: map(resource.performer, (x) => ui.reference(`${i18n}.performer`, x), true),
        VaccinationIndication: ui.codeableConcept(
            `${i18n}.reason_code.vaccination_indication`,
            resource.vaccinationIndication
        ),
        VaccinationMotive: ui.codeableConcept(
            `${i18n}.reason_code.vaccination_motive`,
            resource.vaccinationMotive
        ),
        ProtocolApplied: map(
            resource.protocolApplied,
            (x) => protocolAppliedUiSchema(x, context),
            true
        ),
    };

    const zibVaccinationv4 = {
        VaccineCode: ui.codeableConcept(`${i18n}.vaccine_code`, resource.vaccineCode),
        OccurrenceDateTime: ui.dateTime(
            `${i18n}.occurrence_date_time`,
            resource.occurrenceDateTime
        ),
        DoseQuantity: ui.quantity(`${i18n}.dose_quantity`, resource.doseQuantity),
        Note: ui.annotation(`${i18n}.note`, resource.note),
    };

    return {
        label: getLabel(resource, context),
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
                label: formatMessage(`${i18n}.performed_by`),
                children: [
                    ...artDecorDatasetVaccinationImmunization.Performer,
                    artDecorDatasetVaccinationImmunization.Location,
                ],
            },
            {
                label: formatMessage(`${i18n}.extra`),
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
    };
};
