import { faker } from '$test';
import { type ObservationComponent } from '@minvws/mgo-fhir-types';
import { expect, test } from 'vitest';
import { findComponentByCode } from './findComponentByCode';

function createComponent(code?: string): ObservationComponent {
    return {
        code: {
            coding: [
                {
                    system: 'http://loinc.org', // NOSONAR
                    code: code ?? faker.number.int(100).toString(),
                    display: 'AverageBloodPressure recorded with UCUM',
                },
            ],
        },
        valueQuantity: {
            value: faker.number.int(999),
            unit: 'mmHg',
            system: 'http://unitsofmeasure.org', // NOSONAR
            code: 'mm[Hg]',
        },
    };
}

test('findComponentByCode matched by code and returns the component', () => {
    const code = faker.number.int(100).toString();
    const component = createComponent(code);
    const input = [component, createComponent()];

    const value = findComponentByCode(input, code);
    expect(value).toBe(component);
});

test('findComponentByCode does not match by code and returns the undefined', () => {
    const code = faker.number.int({ min: 200 }).toString();
    const input = [createComponent(), createComponent()];

    const value = findComponentByCode(input, code);
    expect(value).toBeUndefined();
});

test('findComponentByCode matched by code with multiple inputs and returns the component', () => {
    const code1 = faker.number.int(100).toString();
    const code2 = faker.number.int(200).toString();
    const component = createComponent(code1);
    const input = [component, createComponent()];

    const value = findComponentByCode(input, [code1, code2]);
    expect(value).toBe(component);
});
