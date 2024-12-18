import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { map } from '../../../utils';
import { nlCoreAddressInformation, nlCoreNameInformation } from '../../elements';
import { type R4NlCorePatient } from './nlCorePatient';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317041
 */
export const uiSchema: UiSchemaFunction<R4NlCorePatient> = (resource, context) => {
    const i18n = 'r4.nl_core_patient';
    const ui = context.ui as NonStrictUi;

    const name = map(resource.name, (x) => nlCoreNameInformation.uiSchemaGroup(x, context), true);
    const addresses = map(
        resource.address,
        (x) => nlCoreAddressInformation.uiSchemaGroup(x, context),
        true
    );

    return {
        label: resource.name?.at(0)?.text,
        children: [
            ...name,
            {
                label: `${i18n}.group_details`,
                children: [
                    ui.identifier(`${i18n}.identifier`, resource.identifier),
                    ui.date(`${i18n}.birth_date`, resource.birthDate),
                    ui.boolean(`${i18n}.deceased`, resource.deceased),
                    ui.dateTime(`${i18n}.deceased_date_time`, resource.deceasedDateTime),
                    ui.code(`${i18n}.gender`, resource.gender),
                    ui.reference(`${i18n}.general_practitioner`, resource.generalPractitioner),
                    ui.reference(`${i18n}.managing_organization`, resource.managingOrganization),
                    ui.codeableConcept(`${i18n}.marital_status`, resource.maritalStatus),
                    ui.boolean(`${i18n}.multiple_birth`, resource.multipleBirth),
                ],
            },
            ...addresses,
        ],
    };
};
