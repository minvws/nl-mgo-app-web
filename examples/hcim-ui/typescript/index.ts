import { type MgoCode } from '@minvws/mgo-hcim-parse';
import { createUiContext, createUiHelpers, type SingleValue } from '@minvws/mgo-hcim-ui';
import packageJson from '@minvws/mgo-hcim-ui/package.json' with { type: 'json' };
import { Locale } from '@minvws/mgo-intl';

const json = (value: any) => JSON.stringify(value, null, 2);
const { name, version } = packageJson;

const input: MgoCode = {
    _type: 'code',
    value: 'foobar',
};
const expected: SingleValue = {
    label: 'Status',
    type: 'SINGLE_VALUE',
    display: 'foobar',
};

const uiHelpers = createUiHelpers(createUiContext({ locale: Locale.NL_NL }));
const result = uiHelpers.code('fhir.x.status', input);

if (json(result) !== json(expected)) {
    console.log(`❌ ${name}@${version} - Test failed`);
    throw new Error(`\n expected: "${json(expected)}"\n got: "${json(result)}"`);
}

console.log(`✅ ${name}@${version} - Test passed`);
