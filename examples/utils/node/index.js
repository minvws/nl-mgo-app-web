import { isNullish } from '@minvws/mgo-utils';

const expected = true;
const result = isNullish(undefined);

if (result !== expected) {
    throw new Error(`❌ Test failed: expected "${JSON.stringify(expected)}", got "${result}"`);
}

console.log('✅ Test passed');
