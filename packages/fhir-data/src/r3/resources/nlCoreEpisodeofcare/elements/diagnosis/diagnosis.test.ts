import { faker, testUiSchemaContext } from '$test';
import { expect, test } from 'vitest';
import { parse } from '../../../../../parse';
import { diagnosis } from './diagnosis';

test('diagnosis parses successfully', () => {
    const data = faker.fhir.episodeOfCareDiagnosis();
    const schema = diagnosis.parse(data);
    expect(schema).toEqual(
        expect.objectContaining({
            condition: parse.reference(data.condition),
            role: parse.codeableConcept(data.role),
            rank: parse.positiveInt(data.rank),
        })
    );
});

test('diagnosis UI schema group is created successfully', () => {
    const data = diagnosis.parse(faker.fhir.episodeOfCareDiagnosis());
    const schema = diagnosis.uiSchemaGroup(
        data,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(schema.label).toBe('r3.nl_core_episodeofcare.diagnosis');
});
