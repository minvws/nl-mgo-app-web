import { ui, type UiSchema } from '../../../ui';
import { map } from '../../../utils';
import { humanName } from '../../../rX/elements';
import { type NlCorePatientR4 } from './nlCorePatient';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317041
 */
export function uiSchema(resource: NlCorePatientR4): UiSchema {
    const i18n = 'nl_core_patient';
    const name = map(resource.name, humanName.uiSchemaGroup, true);

    return {
        label: resource.name?.at(0)?.text,
        children: [
            {
                label: `${i18n}.group_details`,
                children: [
                    ui.boolean(`${i18n}.active`, resource.active),
                    ui.date(`${i18n}.birth_date`, resource.birthDate),
                    ui.boolean(`${i18n}.deceased`, resource.deceased),
                    ui.dateTime(`${i18n}.deceased_date_time`, resource.deceasedDateTime),
                    ui.code(`${i18n}.gender`, resource.gender),
                    ui.multipleValues(
                        `${i18n}.general_practitioner`,
                        resource.generalPractitioner,
                        ui.reference
                    ),
                    ui.multipleValues(`${i18n}.identifier`, resource.identifier, ui.identifier),
                    ui.reference(`${i18n}.managing_organization`, resource.managingOrganization),
                    ui.codeableConcept(`${i18n}.marital_status`, resource.maritalStatus),
                    ui.boolean(`${i18n}.multiple_birth`, resource.multipleBirth),
                    ui.integer(`${i18n}.multiple_birth_integer`, resource.multipleBirthInteger),
                ],
            },
            ...name,
        ],
    };
}
