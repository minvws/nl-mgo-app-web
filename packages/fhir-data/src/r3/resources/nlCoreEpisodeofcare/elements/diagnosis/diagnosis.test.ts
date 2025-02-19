import { faker, testSet, testUiSchemaContext } from '$test';
import { expect } from 'vitest';
import { codeableConcept } from '../../../../../parse/type';
import { diagnosis } from './diagnosis';

testSet(
    'diagnosis parses successfully',
    faker.fhir.episodeOfCareDiagnosis,
    (data) => {
        const schema = diagnosis.parse(data);
        expect(schema).toEqual(
            expect.objectContaining({
                condition: data.condition,
                role: codeableConcept(data.role),
                rank: data.rank,
            })
        );
    },
    false
);

testSet(
    'diagnosis UI schema group is created successfully',
    () => {
        const data = faker.fhir.episodeOfCareDiagnosis();
        return diagnosis.parse(data);
    },
    (data) => {
        const schema = diagnosis.uiSchemaGroup(
            data,
            testUiSchemaContext({
                ignoreMissingTranslations: true,
            })
        );
        expect(schema.label).toBe('r3.nl_core_episodeofcare.diagnosis');
    },
    false
);
