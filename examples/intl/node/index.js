import { Locale, getFhirIntlConfig, createIntl } from '@minvws/mgo-intl';
import packageJson from '@minvws/mgo-intl/package.json' with { type: 'json' };

const { name, version } = packageJson;

const intl = createIntl(getFhirIntlConfig({ locale: Locale.NL_NL }));
const output = intl.formatMessage({ id: 'r3.nl_core_patient.name' });

const expected = 'Naamgegevens';

if (output !== expected) {
    throw new Error(`expected "${expected}", got "${output}"`);
}

console.log(`✅ ${name}@${version} - Test passed`);
