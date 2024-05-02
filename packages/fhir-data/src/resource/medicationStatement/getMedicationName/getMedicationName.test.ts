import type { MedicationStatement } from '../../../fhir';
import medicationStatement1 from '../fixtures/stu3-medication-statement-1.json';

import { expect, test } from 'vitest';
import { getMedicationName } from './getMedicationName';

test('getMedicationName returns the medication name', () => {
    expect(getMedicationName(medicationStatement1 as MedicationStatement)).toBe(
        'Metoclopramide zetpil 20mg'
    );
});
