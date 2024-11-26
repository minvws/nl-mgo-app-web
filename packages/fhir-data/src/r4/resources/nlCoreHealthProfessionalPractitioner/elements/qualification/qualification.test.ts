import { faker } from '$test';
import { expect, test } from 'vitest';
import { qualification } from './qualification';

test('qualification parses successfully', () => {
    const input = faker.fhirR4.practitionerQualification();
    const data = qualification.parse(input);
    expect(data).toEqual(
        expect.objectContaining({
            period: input.period,
            issuer: input.issuer,
        })
    );
});

test('qualification UI schema group is created successfully', () => {
    const input = faker.fhirR4.practitionerQualification();
    const data = qualification.parse(input);
    const schema = qualification.uiSchemaGroup(data);
    expect(schema.label).toBe(
        'nl_core_health_professional_practitioner.qualification.group_details'
    );
});
