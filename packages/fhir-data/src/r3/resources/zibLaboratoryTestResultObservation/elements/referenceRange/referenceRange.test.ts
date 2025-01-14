import { faker, testUiSchemaContext } from '$test';
import { expect, test } from 'vitest';
import { type MgoQuantity } from '../../../../../parse/type';
import { referenceRange, type ReferenceRange } from './referenceRange';
import { message } from '$test/i18n';

test('summary uses translated label when type.coding has system "referencerange-meaning"', () => {
    const value: Partial<ReferenceRange> = {
        low: faker.fhir.quantity() as MgoQuantity,
        high: faker.fhir.quantity() as MgoQuantity,
        type: {
            text: undefined,
            coding: [
                {
                    system: faker.internet.url(),
                    code: faker.lorem.slug(),
                    display: faker.lorem.sentence(),
                },
                {
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
        message(`system.code.http://hl7.org/fhir/referencerange-meaning|recommended`)
    );
});

test('summary uses label from the first type.coding system found when "referencerange-meaning" is not available', () => {
    const value: Partial<ReferenceRange> = {
        low: faker.fhir.quantity() as MgoQuantity,
        high: faker.fhir.quantity() as MgoQuantity,
        type: {
            text: undefined,
            coding: [
                {
                    system: faker.internet.url(),
                    code: faker.lorem.slug(),
                    display: faker.lorem.sentence(),
                },
                {
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
        low: faker.fhir.quantity() as MgoQuantity,
        high: faker.fhir.quantity() as MgoQuantity,
        type: {
            text: undefined,
            coding: [],
        },
    };

    const summarySchema = referenceRange.summary(
        value as ReferenceRange,
        testUiSchemaContext({ isSummary: true })
    );

    expect(summarySchema.label).toBe(
        message('summary.r3.zib_laboratory_test_result_observation.reference_range')
    );
});

test('summary defaults to the normal range type, when no type is specified', () => {
    const value: Partial<ReferenceRange> = {
        low: faker.fhir.quantity() as MgoQuantity,
        high: faker.fhir.quantity() as MgoQuantity,
    };

    const summarySchema = referenceRange.summary(
        value as ReferenceRange,
        testUiSchemaContext({ isSummary: true })
    );

    expect(summarySchema.label).toBe(
        message(`system.code.http://hl7.org/fhir/referencerange-meaning|normal`)
    );
});
