import { type MessagesIds } from '$/i18n/messages';
import { type UiSchema } from '@minvws/mgo-fhir-data';
import { useIntl } from 'react-intl';

type UiValueLabel = UiSchema['children'][number]['label'];

export function useFhirLabel(label: UiValueLabel) {
    const intl = useIntl();
    return intl.formatMessage({ id: label as MessagesIds });
}
