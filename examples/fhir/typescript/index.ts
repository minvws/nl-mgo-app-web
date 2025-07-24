import { isFhirResource, type ResourceByType } from '@minvws/mgo-fhir';
import packageJson from '@minvws/mgo-fhir/package.json' with { type: 'json' };
import { type Patient as PatientR3 } from '@minvws/mgo-fhir/r3';
import { type Patient as PatientR4 } from '@minvws/mgo-fhir/r4';

const { name, version } = packageJson;

const expected = true;
let result = false;

const unknown = { resourceType: 'Patient' };
const patientRx = {} as ResourceByType<'Patient'>;
const patientR3 = {} as PatientR3;
const patientR4 = {} as PatientR4;

if (isFhirResource(unknown, 'Patient')) {
    unknown.birthDate = '2025-01-01';
    patientRx.birthDate = '2025-01-01';
    patientR3.birthDate = '2025-01-01';
    patientR4.birthDate = '2025-01-01';
    result = true;
}

if (result !== expected) {
    console.log(`❌ ${name}@${version} - Test failed`);
    throw new Error(`expected "${JSON.stringify(expected)}", got "${result}"`);
}

console.log(`✅ ${name}@${version} - Test passed`);
