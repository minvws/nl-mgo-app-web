import { type Patient } from 'fhir/r4';
import { parse } from '../../../parse';
import { humanName } from '../../../rX/elements';
import { map } from '../../../utils';
import { type ResourceConfigR4 } from '../config';
import { uiSchema } from './uiSchema';
import { FhirVersion } from '../../../types/Fhir';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/nl-core-Patient'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.8.0-beta.1/files/1946199
 */
function parseNlCorePatient(resource: Patient) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R4),
        active: parse.boolean(resource.active),
        birthDate: parse.date(resource.birthDate),
        deceased: parse.boolean(resource.deceasedBoolean),
        deceasedDateTime: parse.dateTime(resource.deceasedDateTime),
        gender: parse.code(resource.gender),
        generalPractitioner: map(resource.generalPractitioner, parse.reference),
        identifier: map(resource.identifier, parse.identifier),
        managingOrganization: parse.reference(resource.managingOrganization),
        maritalStatus: parse.codeableConcept(resource.maritalStatus),
        multipleBirth: parse.boolean(resource.multipleBirthBoolean),
        multipleBirthInteger: parse.integer(resource.multipleBirthInteger),
        name: map(resource.name, humanName.parse),
    };
}

export type NlCorePatientR4 = ReturnType<typeof parseNlCorePatient>;

export const nlCorePatientR4 = {
    profile,
    parse: parseNlCorePatient,
    uiSchema,
} satisfies ResourceConfigR4<Patient, NlCorePatientR4>;
