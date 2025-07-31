import { FhirVersion } from '@minvws/mgo-fhir';
import { type Patient } from '@minvws/mgo-fhir/r3';
import { getMgoResource, type NlCorePatient } from '@minvws/mgo-hcim';
import packageJson from '@minvws/mgo-hcim/package.json' with { type: 'json' };
import fhirPatientResourceJson from './fhir-patient-resource.json' with { type: 'json' };

const json = (value: any) => JSON.stringify(value, null, 2);
const { name, version } = packageJson;

const fhirPatientResource = fhirPatientResourceJson as Patient;
const mgoPatientResource = getMgoResource(fhirPatientResource, {
    fhirVersion: FhirVersion.R3,
}) as NlCorePatient;

const expected = 'Maatschap Vaste Huisarts';
const result = mgoPatientResource.generalPractitioner?.display;

if (json(result) !== json(expected)) {
    console.log(`❌ ${name}@${version} - Test failed`);
    throw new Error(`\n expected: "${json(expected)}"\n got: "${json(result)}"`);
}

console.log(`✅ ${name}@${version}`);
