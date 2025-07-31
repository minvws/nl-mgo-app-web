import { FhirVersion } from '@minvws/mgo-fhir';
import { type Patient } from '@minvws/mgo-fhir/r3';
import { filterCodeableConcept, oneOfValueX, parse } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { map } from '@minvws/mgo-utils';
import { type ResourceConfig } from '../../../resourceTypes.js';
import {
    parseNlCoreAddress,
    parseNlCoreContactpoint,
    parseNlCoreHumanname,
} from '../../elements/index.js';
import { relatieCodelijstValueSet } from '../../valueSets/relatieCodelijst.js';
import { rolCodelijstValueSet } from '../../valueSets/rolCodelijst.js';

const profile = 'http://fhir.nl/fhir/StructureDefinition/nl-core-patient'; // NOSONAR

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
        'http://nictiz.nl/fhir/StructureDefinition/patient-proficiency', // NOSONAR
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
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317041
 */
function parseNlCorePatient(resource: Patient) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM LifeStance-v3.1(2017EN)
        lifeStance: parse.extensionMultiple(
            resource,
            'http://nictiz.nl/fhir/StructureDefinition/zib-LifeStance', // NOSONAR,
            'codeableConcept'
        ),

        // HCIM FamilySituation-v3.0(2017EN), HCIM MaritalStatus-v3.0(2017EN)
        maritalStatus: parse.codeableConcept(resource.maritalStatus),

        // HCIM BasicElements-v1.0(2017EN)
        identifier: {
            bsn: parse.identifier(
                resource.identifier?.find(
                    (x) => x.system === 'http://fhir.nl/fhir/NamingSystem/bsn' // NOSONAR
                )
            ),
        },

        // HCIM FreedomRestrictingMeasures-v3.1(2017EN)
        legalStatus: parse.extensionMultiple(
            resource,
            'http://nictiz.nl/fhir/StructureDefinition/zib-patient-legalstatus', // NOSONAR,
            'codeableConcept'
        ),

        // HCIM LanguageProficiency-v3.1(2017EN)
        communication: map(resource.communication, (communication) => ({
            languageProficiency: parseLanguageProficiency(communication),
            comment: parse.extensionMultiple(
                communication,
                'http://nictiz.nl/fhir/StructureDefinition/ext-Comment', // NOSONAR
                'string'
            ),
            language: parse.codeableConcept(communication.language),
        })),

        // HCIM ContactInformation-v1.0(2017EN)
        telecom: map(resource.telecom, parseNlCoreContactpoint),

        // HCIM Payer-v3.1(2017EN)
        name: map(resource.name, parseNlCoreHumanname),
        address: map(resource.address, parseNlCoreAddress),

        // HCIM Nationality-v3.0(2017EN)
        nationality: parse.customExtensionMultiple(
            resource,
            'http://hl7.org/fhir/StructureDefinition/patient-nationality', // NOSONAR
            (nationality) => ({
                code: parse.extension(nationality, 'code', 'codeableConcept'),
                period: parse.extension(nationality, 'period', 'period'),
            })
        ),

        // HCIM HealthProfessional-v3.2(2017EN), HCIM HealthcareProvider-v3.1.1(2017EN)
        generalPractitioner: parse.reference(resource.generalPractitioner?.[0]),
        preferredPharmacy: parse.extension(
            resource,
            'http://fhir.nl/fhir/StructureDefinition/nl-core-preferred-pharmacy', // NOSONAR
            'reference'
        ),

        // HCIM ContactPerson-v3.1(2017EN)
        contact: map(resource.contact, (contact) => ({
            relationship: {
                role: map(
                    filterCodeableConcept(contact.relationship, rolCodelijstValueSet),
                    parse.codeableConcept
                ),
                relationship: map(
                    filterCodeableConcept(contact.relationship, relatieCodelijstValueSet),
                    parse.codeableConcept
                ),
            },
            name: parseNlCoreHumanname(contact.name),
            address: parseNlCoreAddress(contact.address),
            // HCIM ContactInformation-v1.0(2017EN)
            telecom: map(contact.telecom, parseNlCoreContactpoint),
        })),

        // HCIM Patient-v3.1(2017EN)
        birthDate: parse.date(resource.birthDate),
        ...oneOfValueX(resource, ['boolean', 'dateTime'], 'deceased'),
        ...oneOfValueX(resource, ['boolean', 'integer'], 'multipleBirth'),
        gender: {
            ...parse.string(resource.gender),
            geslachtCodelijst: parse.extension(
                resource._gender,
                'http://nictiz.nl/fhir/StructureDefinition/code-specification', // NOSONAR
                'codeableConcept'
            ),
        },
    };
}

export type NlCorePatient = ReturnType<typeof parseNlCorePatient>;

export const nlCorePatient = {
    profile,
    parse: parseNlCorePatient,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<FhirVersion.R3, Patient, NlCorePatient>;
