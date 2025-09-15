import { createUiContext, createUiHelpers } from '@minvws/mgo-hcim-ui';
import packageJson from '@minvws/mgo-hcim-ui/package.json' with { type: 'json' };

const json = (value) => JSON.stringify(value, null, 2);
const { name, version } = packageJson;

const input = {
    _type: 'code',
    value: 'foobar',
};
const expected = {
    label: 'Status',
    type: 'SINGLE_VALUE',
    display: 'foobar',
};

const uiHelpers = createUiHelpers(createUiContext({ locale: 'nl-NL' }));
const result = uiHelpers.code('fhir.x.status', input);

if (json(result) !== json(expected)) {
    console.log(`❌ ${name}@${version} - Test failed`);
    throw new Error(`\n expected: "${json(expected)}"\n got: "${json(result)}"`);
}

console.log(`✅ ${name}@${version} - Test passed`);
