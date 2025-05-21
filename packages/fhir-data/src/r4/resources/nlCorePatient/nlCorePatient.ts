import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Patient } from 'fhir/r4';
import { parse } from '../../../parse';
import { oneOfValueX } from '../../../parse/helpers';
import { type ResourceConfig } from '../../../types';
import { generateUiSchema } from '../../../ui/generator';
import { map } from '../../../utils';
import {
    parseNlCoreAddressInformation,
    parseNlCoreContactInformation,
    parseNlCoreNameInformation,
} from '../../elements';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/nl-core-Patient'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.11.0-beta.1/files/2628570
 */
function parseNlCorePatient(resource: Patient) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R4),

        // zib Patient-v3.2(2020EN)
        identifier: {
            bsn: parse.identifier(
                resource.identifier?.find(
                    (x) => x.system === 'http://fhir.nl/fhir/NamingSystem/bsn' // NOSONAR
                )
            ),
        },
        name: map(resource.name, parseNlCoreNameInformation),
        telecom: parseNlCoreContactInformation(resource.telecom),
        gender: {
            genderCodeList: parse.extension(
                resource._gender,
                'http://nictiz.nl/fhir/StructureDefinition/ext-CodeSpecification', // NOSONAR
                'codeableConcept'
            ),
        },
        birthDate: parse.date(resource.birthDate),
        ...oneOfValueX(resource, ['boolean', 'dateTime'], 'deceased'),
        address: map(resource.address, parseNlCoreAddressInformation),
        ...oneOfValueX(resource, ['integer', 'boolean'], 'multipleBirth'),
    };
}

export type R4NlCorePatient = ReturnType<typeof parseNlCorePatient>;

export const r4NlCorePatient = {
    profile,
    parse: parseNlCorePatient,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<Patient, R4NlCorePatient>;
