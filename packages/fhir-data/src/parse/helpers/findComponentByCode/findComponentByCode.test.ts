import { faker } from '$test';
import { type ObservationComponent } from '@minvws/mgo-fhir-types';
import { expect, test } from 'vitest';
import { findComponentByCode } from './findComponentByCode';

test('findComponentByCode matched by code and returns the component', () => {
    const code = faker.number.int(100).toString();
    const component = createComponent(code);
    const input = [component, createComponent()];

    const value = findComponentByCode(input, code);
    expect(value).toBe(component);
});

test('findComponentByCode does not match by code and returns the undefined', () => {
    const code = faker.number.int(100).toString();
    const input = [createComponent(), createComponent()];

    const value = findComponentByCode(input, code);
    expect(value).toBeUndefined();
});

function createComponent(code?: string): ObservationComponent {
    return {
        code: {
            coding: [
                {
                    system: 'http://loinc.org',
                    code: code ?? faker.number.int(100).toString(),
                    display: 'AverageBloodPressure recorded with UCUM',
                },
            ],
        },
        valueQuantity: {
            value: faker.number.int(999),
            unit: 'mmHg',
            system: 'http://unitsofmeasure.org',
            code: 'mm[Hg]',
        },
    };
}
