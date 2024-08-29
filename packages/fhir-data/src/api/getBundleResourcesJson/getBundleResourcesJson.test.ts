import fs from 'fs';
import { URL, fileURLToPath } from 'url';
import { expect, test } from 'vitest';
import { getBundleResourcesJson } from './getBundleResourcesJson';

function loadStringFromFile(path: string) {
    const resolvedPath = fileURLToPath(new URL(path, import.meta.url));
    return fs.readFileSync(resolvedPath).toString();
}

test('returns the expected output', () => {
    const medicationBundle = loadStringFromFile('./fixtures/medication-bundle.json');
    const resultJson = getBundleResourcesJson(medicationBundle, true);

    expect(() => JSON.parse(resultJson!)).not.toThrow();
    expect(resultJson).toMatchFileSnapshot('./fixtures/medication-bundle-resources.snap.json');
});

test('throws if the input is not a bundle', () => {
    expect(() => getBundleResourcesJson('{}')).toThrowError(
        `input does not seem to be a Fhir Bundle. Received resourceType: "undefined"`
    );
});
