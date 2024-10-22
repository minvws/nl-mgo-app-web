import { faker } from '$test';
import { test, expect } from 'vitest';
import { componentSlice } from './componentSlice';
import { type ObservationComponent } from 'fhir/r3';

test('componentSlice matched by code and returns the component', () => {
    const code = faker.number.int(100).toString();
    const component = createComponent(code);
    const input = [component, createComponent()];

    const value = componentSlice(input, code);
    expect(value).toBe(component);
});

test('componentSlice does not match by code and returns the undefined', () => {
    const code = faker.number.int(100).toString();
    const input = [createComponent(), createComponent()];

    const value = componentSlice(input, code);
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
