import input from './fixtures/zib-MedicationUse-01-output.snap.json';
import { expect, test } from 'vitest';
import { uiSchema } from './uiSchema';
import { type ZibMedicationUse } from './zibMedicationUse';

test('uiSchema returns the expected output', () => {
    const zibMedicationUse = input as ZibMedicationUse;
    const zibMedicationUseUiSchema = uiSchema(zibMedicationUse);
    const json = JSON.stringify(zibMedicationUseUiSchema, null, 4);
    expect(json).toMatchFileSnapshot('./fixtures/zib-MedicationUse-01-uiSchema.snap.json');
});

test('uiSchema doesnt include instruction for use if there are none', () => {
    const zibMedicationUse = input as ZibMedicationUse;
    let schema = uiSchema(zibMedicationUse);
    let instructionsGroup = schema.children.find(
        ({ label }) => label === 'zib_instructions_for_use.group'
    );
    expect(instructionsGroup).toBeDefined();

    schema = uiSchema({ ...zibMedicationUse, dosage: null });
    instructionsGroup = schema.children.find(
        ({ label }) => label === 'zib_instructions_for_use.group'
    );
    expect(instructionsGroup).toBeUndefined();
});

test('uiSchema has an empty label if there is nog medication.display', () => {
    const zibMedicationUse = input as ZibMedicationUse;

    const schema = uiSchema({ ...zibMedicationUse, medication: null });
    expect(schema.label).toBe('');
});
