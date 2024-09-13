import { type UiSchema } from '@minvws/mgo-fhir-data';
import { useIntl } from 'react-intl';
import { isNullish } from '@minvws/mgo-fhir-data/utils/isNullish/isNullish.js';

type UiValueLabel = UiSchema['children'][number]['label'];

export function useFhirLabel(label: UiValueLabel) {
    const intl = useIntl();
    const fallbackLabel = label.replace(/^[\w-]+\./g, 'fhir.');
    const i18nId = isNullish(intl.messages[label]) ? fallbackLabel : label;
    return intl.formatMessage({ id: i18nId });
}
