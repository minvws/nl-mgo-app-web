import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Patient } from 'fhir/r4';
import { parse } from '../../../parse';
import { oneOfValueX } from '../../../parse/helpers';
import { type ResourceConfig } from '../../../resourceTypes';
import { generateUiSchema } from '../../../ui/generator';
import { map } from '../../../utils';
import {
    parseNlCoreAddressInformation,
    parseNlCoreContactInformation,
    parseNlCoreNameInformation,
} from '../../elements';
import { parseNlCoreContactPerson } from '../../elements/nlCoreContactPerson/nlCoreContactPerson';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/nl-core-Patient'; // NOSONAR

function parseLanguageProficiency(communication: NonNullable<Patient['communication']>[number]) {
    const result: {
        languageControlListening: parse.MgoCoding | undefined;
        languageControlReading: parse.MgoCoding | undefined;
        languageControlSpeaking: parse.MgoCoding | undefined;
    } = {
        languageControlListening: undefined,
        languageControlReading: undefined,
        languageControlSpeaking: undefined,
    };

    parse.customExtensionMultiple(
        communication,
        'http://hl7.org/fhir/StructureDefinition/patient-proficiency', // NOSONAR
        (proficiency) => {
            const type = parse.extension(proficiency, 'type', 'coding');
            const level = parse.extension(proficiency, 'level', 'coding');

            if (type?.code === 'RSP') {
                result.languageControlListening = level;
            } else if (type?.code === 'RWR') {
                result.languageControlReading = level;
            } else if (type?.code === 'ESP') {
                result.languageControlSpeaking = level;
            }
        }
    );

    return result;
}

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
            genderCodelist: parse.extension(
                resource._gender,
                'http://nictiz.nl/fhir/StructureDefinition/ext-CodeSpecification', // NOSONAR
                'codeableConcept'
            ),
        },
        birthDate: parse.date(resource.birthDate),
        ...oneOfValueX(resource, ['boolean', 'dateTime'], 'deceased'),
        address: map(resource.address, parseNlCoreAddressInformation),
        ...oneOfValueX(resource, ['integer', 'boolean'], 'multipleBirth'),

        // zib Nationality-v3.0(2020EN)
        nationality: parse.customExtensionMultiple(
            resource,
            'http://hl7.org/fhir/StructureDefinition/patient-nationality', // NOSONAR
            (nationality) => ({
                code: parse.extension(nationality, 'code', 'codeableConcept'),
                period: parse.extension(nationality, 'period', 'period'),
            })
        ),

        // zib MaritalStatus-v3.1(2020EN)
        maritalStatus: parse.codeableConcept(resource.maritalStatus),

        // zib LanguageProficiency-v3.2(2020EN)
        communication: map(resource.communication, (communication) => ({
            languageProficiency: parseLanguageProficiency(communication),
            comment: parse.extensionMultiple(
                communication,
                'http://nictiz.nl/fhir/StructureDefinition/ext-Comment', // NOSONAR
                'string'
            ),
            language: parse.codeableConcept(communication.language),
        })),

        // zib ContactPerson-v3.4(2020EN)
        contact: map(resource.contact, parseNlCoreContactPerson),
    };
}

export type R4NlCorePatient = ReturnType<typeof parseNlCorePatient>;

export const r4NlCorePatient = {
    profile,
    parse: parseNlCorePatient,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<Patient, R4NlCorePatient>;
