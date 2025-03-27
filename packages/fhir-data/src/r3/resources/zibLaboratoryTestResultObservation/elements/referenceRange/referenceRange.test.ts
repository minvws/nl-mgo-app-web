import { faker, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import { expect, test } from 'vitest';
import { referenceRange, type ReferenceRange } from './referenceRange';

test('summary uses translated label when type.coding has system "referencerange-meaning"', () => {
    const value: Partial<ReferenceRange> = {
        low: faker.mgo.quantity(),
        high: faker.mgo.quantity(),
        type: {
            _type: 'CodeableConcept',
            text: undefined,
            coding: [
                {
                    _type: 'Coding',
                    system: faker.internet.url(),
                    code: faker.lorem.slug(),
                    display: faker.lorem.sentence(),
                },
                {
                    _type: 'Coding',
                    system: 'http://hl7.org/fhir/referencerange-meaning',
                    code: 'recommended',
                    display: 'Recommended Range',
                },
            ],
        },
    };

    const summarySchema = referenceRange.summary(
        value as ReferenceRange,
        testUiSchemaContext({ isSummary: true })
    );

    expect(summarySchema.label).toBe(
        fhirMessage(`system.code.http://hl7.org/fhir/referencerange-meaning|recommended`)
    );
});

test('summary uses label from the first type.coding system found when "referencerange-meaning" is not available', () => {
    const value: Partial<ReferenceRange> = {
        low: faker.mgo.quantity(),
        high: faker.mgo.quantity(),
        type: {
            _type: 'CodeableConcept',
            text: undefined,
            coding: [
                {
                    _type: 'Coding',
                    system: faker.internet.url(),
                    code: faker.lorem.slug(),
                    display: faker.lorem.sentence(),
                },
                {
                    _type: 'Coding',
                    system: faker.internet.url(),
                    code: faker.lorem.slug(),
                    display: faker.lorem.sentence(),
                },
            ],
        },
    };

    const summarySchema = referenceRange.summary(
        value as ReferenceRange,
        testUiSchemaContext({ isSummary: true })
    );

    expect(summarySchema.label).toBe(value.type?.coding[0].display);
});

test('summary uses fallback label when there is a type, but it could not be translated in any way', () => {
    const value: Partial<ReferenceRange> = {
        low: faker.mgo.quantity(),
        high: faker.mgo.quantity(),
        type: {
            _type: 'CodeableConcept',
            text: undefined,
            coding: [],
        },
    };

    const summarySchema = referenceRange.summary(
        value as ReferenceRange,
        testUiSchemaContext({ isSummary: true })
    );

    expect(summarySchema.label).toBe(
        fhirMessage('summary.r3.zib_laboratory_test_result_observation.reference_range')
    );
});

test('summary defaults to the normal range type, when no type is specified', () => {
    const value: Partial<ReferenceRange> = {
        low: faker.mgo.quantity(),
        high: faker.mgo.quantity(),
    };

    const summarySchema = referenceRange.summary(
        value as ReferenceRange,
        testUiSchemaContext({ isSummary: true })
    );

    expect(summarySchema.label).toBe(
        fhirMessage(`system.code.http://hl7.org/fhir/referencerange-meaning|normal`)
    );
});
