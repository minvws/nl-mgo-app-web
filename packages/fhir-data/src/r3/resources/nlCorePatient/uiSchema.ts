import { nlCoreHumanname, nlCoreAddress, nlCoreContactpoint } from '../../elements';
import { ui, type UiSchema } from '../../../ui';
import { map } from '../../../utils';
import { uiSchemaGroup as photoUiSchema } from '../../elements/attachment/uiSchemaGroup';
import { uiSchemaGroup as communicationUiSchema } from './elements/communication/uiSchemaGroup';
import { uiSchemaGroup as contactUiSchema } from './elements/contact/uiSchemaGroup';
import { uiSchemaGroup as linkUiSchema } from './elements/link/uiSchemaGroup';
import { type NlCorePatient } from './nlCorePatient';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317041
 */
export function uiSchema(resource: NlCorePatient): UiSchema {
    const i18n = 'nl_core_patient';

    const address = map(resource.address, nlCoreAddress.uiSchemaGroup, true);
    const communication = map(resource.communication, communicationUiSchema, true);
    const contact = map(resource.contact, contactUiSchema, true);
    const link = map(resource.link, linkUiSchema, true);
    const name = map(resource.name, nlCoreHumanname.uiSchemaGroup, true);
    const photo = map(resource.photo, photoUiSchema, true);
    const telecom = map(resource.telecom, nlCoreContactpoint.uiSchemaGroup, true);

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
            ...address,
            ...communication,
            ...contact,
            ...link,
            ...name,
            ...photo,
            ...telecom,
        ],
    };
}
