import { isNullish } from '@minvws/mgo-hcim-parse';
import packageJson from '@minvws/mgo-hcim-parse/package.json' with { type: 'json' };

const { name, version } = packageJson;

const expected = true;
const result = isNullish(undefined);

if (result !== expected) {
    console.log(`❌ ${name}@${version} - Test failed`);
    throw new Error(`expected "${JSON.stringify(expected)}", got "${result}"`);
}

console.log(`✅ ${name}@${version} - Test passed`);
