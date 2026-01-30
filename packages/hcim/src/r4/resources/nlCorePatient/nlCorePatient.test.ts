import { expectJson, testSchemaContext } from '$test';
import { type Patient } from '@minvws/mgo-fhir/r4';
import { expect, test } from 'vitest';
import input01 from './fixtures/fhir-resource.json' with { type: 'json' };
import { r4NlCorePatient } from './nlCorePatient.js';

test('parseNlCorePatient returns the expected output 01', async () => {
    const output = r4NlCorePatient.parse(input01 as Patient);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', async () => {
    const zibData = r4NlCorePatient.parse(input01 as Patient);
    const zibUiSchema = r4NlCorePatient.uiSchema(zibData, testSchemaContext());
    await expectJson(zibUiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});

test('unknown codes for language proficiency are ignored', async () => {
    const patientData = input01 as Patient;
    patientData.communication = [
        {
            extension: [
                {
                    url: 'http://hl7.org/fhir/StructureDefinition/patient-proficiency',
                    extension: [
                        {
                            url: 'level',
                            valueCoding: {
                                system: 'http://terminology.hl7.org/CodeSystem/v3-LanguageAbilityProficiency',
                                code: 'G',
                                display: 'Good',
                            },
                        },
                        {
                            url: 'type',
                            valueCoding: {
                                system: 'http://terminology.hl7.org/CodeSystem/v3-LanguageAbilityMode',
                                code: 'UNKNOWN',
                                display: 'Received spoken',
                            },
                        },
                    ],
                },
            ],
            language: {
                coding: [
                    {
                        system: 'urn:oid:1.0.639.1',
                        code: 'nl',
                        display: 'Dutch',
                    },
                ],
            },
        },
    ];
    const mgoResource = r4NlCorePatient.parse(patientData);
    const dutchCommunication = mgoResource.communication?.find(
        (communication) => communication.language?.coding?.[0]?.code === 'nl'
    );
    await expect(dutchCommunication?.languageProficiency).toEqual({
        languageControlListening: undefined,
        languageControlReading: undefined,
        languageControlSpeaking: undefined,
    });
});
