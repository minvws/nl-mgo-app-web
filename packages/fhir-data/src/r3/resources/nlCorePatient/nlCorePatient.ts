import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Patient } from 'fhir/r3';
import { parse } from '../../../parse';
import { identifier } from '../../../parse/type/identifier/identifier';
import { type ResourceConfig } from '../../../types';
import { map } from '../../../utils';
import { nlCoreAddress, nlCoreContactpoint, parseNlCoreHumanname } from '../../elements';
import { communication } from './elements/communication/communication';
import { contact } from './elements/contact/contact';
import { link } from './elements/link/link';
import { uiSchema } from './uiSchema';

const profile = 'http://fhir.nl/fhir/StructureDefinition/nl-core-patient'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317041
 */
function parseNlCorePatient(resource: Patient) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
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
        name: map(resource.name, parseNlCoreHumanname),
        photo: map(resource.photo, parse.attachment),
        telecom: map(resource.telecom, nlCoreContactpoint.parse),
    };
}

export type NlCorePatient = ReturnType<typeof parseNlCorePatient>;

export const nlCorePatient = {
    profile,
    parse: parseNlCorePatient,
    uiSchema,
} satisfies ResourceConfig<Patient, NlCorePatient>;
