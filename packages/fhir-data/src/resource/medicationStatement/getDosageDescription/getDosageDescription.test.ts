import type { MedicationStatement } from '../../../fhir';
import medicationStatement1 from '../fixtures/stu3-medication-statement-1.json';

import { expect, test } from 'vitest';
import { getDosageDescription } from './getDosageDescription';

test('getDosageDescription returns the dosage description', () => {
    expect(getDosageDescription(medicationStatement1 as MedicationStatement)).toEqual([
        'Vanaf 12 februari 2024, gedurende 14 dagen, bij koorts per dag 1 stuks, maximaal 2 stuks per dag, rectaal',
    ]);
});
