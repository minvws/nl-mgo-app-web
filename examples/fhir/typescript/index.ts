import { isFhirResource, type ResourceByType } from '@minvws/mgo-fhir';
import packageJson from '@minvws/mgo-fhir/package.json' with { type: 'json' };

const { name, version } = packageJson;

const expected = true;
let result = false;

const unknown = { resourceType: 'Patient' };
const patient = {} as ResourceByType<'Patient'>;

if (isFhirResource(unknown, 'Patient')) {
    unknown.birthDate = '2025-01-01';
    patient.birthDate = '2025-01-01';
    result = true;
}

if (result !== expected) {
    console.log(`❌ ${name}@${version} - Test failed`);
    throw new Error(`expected "${JSON.stringify(expected)}", got "${result}"`);
}

console.log(`✅ ${name}@${version} - Test passed`);
