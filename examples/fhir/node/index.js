import { isFhirResource } from '@minvws/mgo-fhir';
import packageJson from '@minvws/mgo-fhir/package.json' with { type: 'json' };

const { name, version } = packageJson;

const expected = true;
const result = isFhirResource({ resourceType: 'Patient' }, 'Patient');

if (result !== expected) {
    console.log(`❌ ${name}@${version} - Test failed`);
    throw new Error(`expected "${JSON.stringify(expected)}", got "${result}"`);
}

console.log(`✅ ${name}@${version} - Test passed`);
