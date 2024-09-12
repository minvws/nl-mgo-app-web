import { nlCoreAddress } from '../../elements';
import { attachment } from '../../elements/attachment/attachment';
import { nlCoreContactpoint } from '../../elements/nlCoreContactpoint/nlCoreContactpoint';
import { nlCoreHumanname } from '../../elements/nlCoreHumanname/nlCoreHumanname';
import { type Patient } from '../../fhir/index';
import { parse } from '../../parse';
import { identifier } from '../../parse/type/identifier/identifier';
import { map } from '../../utils';
import { type ResourceConfig } from '../config';
import { communication } from './elements/communication/communication';
import { contact } from './elements/contact/contact';
import { link } from './elements/link/link';
import { uiSchema } from './uiSchema';

const profile = 'http://fhir.nl/fhir/StructureDefinition/nl-core-patient';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317041
 */
function parseNlCorePatient(resource: Patient) {
    return {
        ...parse.resourceMeta(resource, profile),
        active: parse.boolean(resource.active),
        address: map(resource.address, nlCoreAddress.parse),
        birthDate: parse.date(resource.birthDate),
        communication: map(resource.communication, communication.parse),
        contact: map(resource.contact, contact.parse),
        deceased: parse.boolean(resource.deceasedBoolean),
        deceasedDateTime: parse.dateTime(resource.deceasedDateTime),
        gender: parse.code(resource.gender),
        generalPractitioner: map(resource.generalPractitioner, parse.reference),
        identifier: map(resource.identifier, identifier),
        link: map(resource.link, link.parse),
        managingOrganization: parse.reference(resource.managingOrganization),
        maritalStatus: parse.codeableConcept(resource.maritalStatus),
        multipleBirth: parse.boolean(resource.multipleBirthBoolean),
        multipleBirthInteger: parse.integer(resource.multipleBirthInteger),
        name: map(resource.name, nlCoreHumanname.parse),
        photo: map(resource.photo, attachment.parse),
        telecom: map(resource.telecom, nlCoreContactpoint.parse),
    };
}

export type NlCorePatient = ReturnType<typeof parseNlCorePatient>;

export const nlCorePatient = {
    profile,
    parse: parseNlCorePatient,
    uiSchema,
} satisfies ResourceConfig<Patient, NlCorePatient>;
