import { parse } from '@minvws/mgo-hcim-parse';
import packageJson from '@minvws/mgo-hcim-parse/package.json' with { type: 'json' };

const { name, version } = packageJson;

const expected = {
    _type: 'code',
    value: 'foobar',
};
const result = parse.code('foobar');

if (JSON.stringify(result) !== JSON.stringify(expected)) {
    console.log(`❌ ${name}@${version} - Test failed`);
    throw new Error(`expected "${JSON.stringify(expected)}", got "${JSON.stringify(result)}"`);
}

console.log(`✅ ${name}@${version} - Test passed`);
