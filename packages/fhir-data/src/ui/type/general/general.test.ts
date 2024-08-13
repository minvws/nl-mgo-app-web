import { faker } from '$test';
import { expect, test } from 'vitest';
import {
    type MgoAnnotation,
    type MgoCodeableConcept,
    type MgoCoding,
    type MgoDuration,
    type MgoIdentifier,
    type MgoPeriod,
    type MgoQuantity,
    type MgoRange,
    type MgoRatio,
} from '../../../parse/type';
import { format } from '../../format';
import * as general from './general';
import { coding } from './general';

function mockQuantity() {
    return {
        value: faker.number.float(),
        comparator: faker.fhir.code(['<', '<=', '>=', '>']),
        code: faker.fhir.code(),
        system: faker.internet.url(),
        unit: faker.lorem.word(),
    };
}

test('annotation', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const data: MgoAnnotation = {
        time: faker.fhir.dateTime(),
        text: faker.lorem.sentence(),
        author: {
            reference: faker.lorem.sentence(),
            display: faker.lorem.sentence(),
        },
    };
    const result = general.annotation(label, data, options);
    expect(result).toEqual({
        label,
        type: 'annotation',
        display: data.text,
        ...options,
    });
});

test('codableConcept', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const [concept1, concept2]: MgoCodeableConcept = [
        { code: faker.fhir.code(), system: faker.internet.url(), display: faker.lorem.sentence() },
        { code: faker.fhir.code(), system: faker.internet.url(), display: faker.lorem.sentence() },
    ];
    const result = general.codableConcept(label, [concept1, concept2], options);
    expect(result).toEqual({
        label,
        type: 'codable_concept',
        display: [coding('', concept1).display, coding('', concept2).display],
        ...options,
    });
});

test('coding', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const mgoCoding: MgoCoding = {
        code: faker.fhir.code(),
        system: faker.internet.url(),
        display: faker.lorem.sentence(),
    };
    const result = general.coding(label, mgoCoding, options);
    expect(result).toEqual({
        label,
        type: 'coding',
        display: `${mgoCoding.display} (${format.codeWithSystem(mgoCoding.code, mgoCoding.system)})`,
        ...options,
    });
});

test('identifier', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const mgoIdentifier: MgoIdentifier = {
        use: null,
        system: faker.internet.url(),
        value: faker.lorem.sentence(),
        type: [
            {
                code: faker.fhir.code(),
                system: faker.internet.url(),
                display: faker.lorem.sentence(),
            },
        ],
    };
    const result = general.identifier(label, mgoIdentifier, options);
    expect(result).toEqual({
        label,
        type: 'identifier',
        display: mgoIdentifier.value,
        ...options,
    });
});

test('period', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const mgoPeriod: MgoPeriod = {
        start: faker.fhir.dateTime(),
        end: faker.fhir.dateTime(),
    };
    const result = general.period(label, mgoPeriod, options);
    expect(result).toEqual([
        {
            label: `${label}.start`,
            type: `period.start`,
            display: format.dateTime(mgoPeriod.start),
            ...options,
        },
        {
            label: `${label}.end`,
            type: `period.end`,
            display: format.dateTime(mgoPeriod.end),
            ...options,
        },
    ]);
});

test('quantity', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const mgoQuantity: MgoQuantity = mockQuantity();
    const result = general.quantity(label, mgoQuantity, options);
    expect(result).toEqual([
        {
            label: `${label}.value`,
            type: `quantity.value`,
            display: format.valueWithUnit(mgoQuantity.value, mgoQuantity.unit),
            ...options,
        },
        {
            label: `${label}.code`,
            type: `quantity.code`,
            display: format.codeWithSystem(mgoQuantity.code, mgoQuantity.system),
            ...options,
        },
    ]);
});

test('duration', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const mgoDuration: MgoDuration = mockQuantity();
    const result = general.duration(label, mgoDuration, options);
    expect(result).toEqual([
        {
            label: `${label}.value`,
            type: `duration.value`,
            display: format.valueWithUnit(mgoDuration.value, mgoDuration.unit),
            ...options,
        },
        {
            label: `${label}.code`,
            type: `duration.code`,
            display: format.codeWithSystem(mgoDuration.code, mgoDuration.system),
            ...options,
        },
    ]);
});

test('ratio', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const { numerator, denominator }: MgoRatio = {
        numerator: mockQuantity(),
        denominator: mockQuantity(),
    };
    const result = general.ratio(label, { numerator, denominator }, options);
    expect(result).toEqual([
        {
            label: `${label}.numerator.value`,
            type: `ratio.numerator.value`,
            display: format.valueWithUnit(numerator.value, numerator.unit),
            ...options,
        },
        {
            label: `${label}.numerator.code`,
            type: `ratio.numerator.code`,
            display: format.codeWithSystem(numerator.code, numerator.system),
            ...options,
        },
        {
            label: `${label}.denominator.value`,
            type: `ratio.denominator.value`,
            display: format.valueWithUnit(denominator.value, denominator.unit),
            ...options,
        },
        {
            label: `${label}.denominator.code`,
            type: `ratio.denominator.code`,
            display: format.codeWithSystem(denominator.code, denominator.system),
            ...options,
        },
    ]);
});

test('range', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const { low, high }: MgoRange = {
        low: mockQuantity(),
        high: mockQuantity(),
    };
    const result = general.range(label, { low, high }, options);
    expect(result).toEqual([
        {
            label: `${label}.low.value`,
            type: `range.low.value`,
            display: format.valueWithUnit(low.value, low.unit),
            ...options,
        },
        {
            label: `${label}.low.code`,
            type: `range.low.code`,
            display: format.codeWithSystem(low.code, low.system),
            ...options,
        },
        {
            label: `${label}.high.value`,
            type: `range.high.value`,
            display: format.valueWithUnit(high.value, high.unit),
            ...options,
        },
        {
            label: `${label}.high.code`,
            type: `range.high.code`,
            display: format.codeWithSystem(high.code, high.system),
            ...options,
        },
    ]);
});
