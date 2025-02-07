import { type HealthUiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { map } from '../../../utils';
import { nlCoreAddress, nlCoreContactpoint, nlCoreHumanname } from '../../elements';
import { uiSchemaGroup as photoUiSchemaGroup } from '../../elements/attachment/uiSchemaGroup';
import { uiSchemaGroup as communicationUiSchema } from './elements/communication/uiSchemaGroup';
import { uiSchemaGroup as contactUiSchema } from './elements/contact/uiSchemaGroup';
import { uiSchemaGroup as linkUiSchema } from './elements/link/uiSchemaGroup';
import { type NlCorePatient } from './nlCorePatient';

export const i18n = 'r3.nl_core_patient';
export const uiSchema: HealthUiSchemaFunction<NlCorePatient> = (resource, context) => {
    const ui = context.ui as NonStrictUi;

    const address = map(resource.address, (x) => nlCoreAddress.uiSchemaGroup(x, context), true);
    const communication = map(
        resource.communication,
        (x) => communicationUiSchema(x, context),
        true
    );
    const contact = map(resource.contact, (x) => contactUiSchema(x, context), true);
    const link = map(resource.link, (x) => linkUiSchema(x, context), true);
    const name = map(resource.name, (x) => nlCoreHumanname.uiSchemaGroup(x, context), true);
    const photo = map(resource.photo, (x) => photoUiSchemaGroup(x, context), true);
    const telecom = map(
        resource.telecom,
        (x) => nlCoreContactpoint.uiSchemaGroup(x, context),
        true
    );

    return {
        label: resource.name?.at(0)?.text ?? context.formatMessage(i18n),
        children: [
            {
                label: `${i18n}.group_details`,
                children: [
                    ui.boolean(`${i18n}.active`, resource.active),
                    ui.date(`${i18n}.birth_date`, resource.birthDate),
                    ui.boolean(`${i18n}.deceased`, resource.deceased),
                    ui.dateTime(`${i18n}.deceased_date_time`, resource.deceasedDateTime),
                    ui.code(`${i18n}.gender`, resource.gender),
                    ui.reference(`${i18n}.general_practitioner`, resource.generalPractitioner),
                    ui.identifier(`${i18n}.identifier`, resource.identifier),
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
};
