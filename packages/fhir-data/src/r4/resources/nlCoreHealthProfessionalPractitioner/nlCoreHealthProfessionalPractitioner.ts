import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Practitioner } from 'fhir/r4';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types';
import { map } from '../../../utils';
import {
    parseNlCoreAddressInformation,
    parseNlCoreContactInformation,
    parseNlCoreNameInformation,
} from '../../elements';
import { qualification } from './elements/qualification/qualification';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/nl-core-HealthProfessional-Practitioner'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.8.0-beta.1/files/1946120
 */
function parseNlCoreHealthProfessionalPractitioner(resource: Practitioner) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R4),
        identifier: map(resource.identifier, parse.identifier), // NL-CM:17.1.2
        name: map(resource.name, parseNlCoreNameInformation), // NL-CM:17.1.3
        telecom: parseNlCoreContactInformation(resource.telecom),
        address: map(resource.address, parseNlCoreAddressInformation), // NL-CM:17.1.7
        gender: parse.code(resource.gender), // NL-CM:17.1.9
        birthDate: parse.date(resource.birthDate),
        qualification: map(resource.qualification, qualification.parse),
        communication: map(resource.communication, parse.codeableConcept),
    };
}

export type R4NlCoreHealthProfessionalPractitioner = ReturnType<
    typeof parseNlCoreHealthProfessionalPractitioner
>;

export const r4NlCoreHealthProfessionalPractitioner = {
    profile,
    parse: parseNlCoreHealthProfessionalPractitioner,
    uiSchema,
} satisfies ResourceConfig<Practitioner, R4NlCoreHealthProfessionalPractitioner>;
