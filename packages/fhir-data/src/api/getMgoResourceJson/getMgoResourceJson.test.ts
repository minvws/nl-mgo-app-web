import fs from 'fs';
import { URL, fileURLToPath } from 'url';
import { expect, test } from 'vitest';
import { getMgoResourceJson } from './getMgoResourceJson';

function loadStringFromFile(path: string) {
    const resolvedPath = fileURLToPath(new URL(path, import.meta.url));
    return fs.readFileSync(resolvedPath).toString();
}

test('returns the expected output', () => {
    const zibMedicationUseJson = loadStringFromFile('./fixtures/zib-MedicationUse-01.json');
    const resultJson = getMgoResourceJson(zibMedicationUseJson, true);

    expect(() => JSON.parse(resultJson!)).not.toThrow();
    expect(resultJson).toMatchFileSnapshot('./fixtures/zib-MedicationUse-01-output.snap.json');
});

test('throws if the input is a fhir resource', () => {
    expect(() => getMgoResourceJson('{}')).toThrowError(
        `input does not seem to be a valid Fhir Resource. Received resourceType: "undefined"`
    );
});
