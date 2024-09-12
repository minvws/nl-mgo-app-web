import { faker, testSet } from '$test';
import { expect } from 'vitest';
import { contact } from './contact';

testSet(
    'contact parses successfully',
    faker.fhir.patientContact,
    (data) => {
        const schema = contact.parse(data);
        expect(schema).toEqual(
            expect.objectContaining({
                organization: data.organization,
            })
        );
    },
    false
);

testSet(
    'contact UI schema group is created successfully',
    () => {
        const data = faker.fhir.patientContact();
        return contact.parse(data);
    },
    (data) => {
        const schema = contact.uiSchemaGroup(data);
        expect(schema.label).toBe('nl_core_patient.contact');
    },
    false
);
