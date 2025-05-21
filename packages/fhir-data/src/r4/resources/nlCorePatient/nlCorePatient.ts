import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Patient } from 'fhir/r4';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types';
import { map } from '../../../utils';
import { parseNlCoreAddressInformation, parseNlCoreNameInformation } from '../../elements';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/nl-core-Patient'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.8.0-beta.1/files/1946199
 */
function parseNlCorePatient(resource: Patient) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R4),
        name: map(resource.name, parseNlCoreNameInformation),
        identifier: map(resource.identifier, parse.identifier), // NL-CM:0.1.7
        birthDate: parse.date(resource.birthDate), // NL-CM:0.1.10
        gender: parse.code(resource.gender), // NL-CM:0.1.9
        multipleBirth: parse.boolean(resource.multipleBirthBoolean), // NL-CM:0.1.31
        deceased: parse.boolean(resource.deceasedBoolean), // NL-CM:0.1.32
        deceasedDateTime: parse.dateTime(resource.deceasedDateTime), // NL-CM:0.1.33
        address: map(resource?.address, parseNlCoreAddressInformation),
        generalPractitioner: map(resource.generalPractitioner, parse.reference),
        managingOrganization: parse.reference(resource.managingOrganization),
        maritalStatus: parse.codeableConcept(resource.maritalStatus),
    };
}

export type R4NlCorePatient = ReturnType<typeof parseNlCorePatient>;

export const r4NlCorePatient = {
    profile,
    parse: parseNlCorePatient,
    uiSchema,
} satisfies ResourceConfig<Patient, R4NlCorePatient>;
