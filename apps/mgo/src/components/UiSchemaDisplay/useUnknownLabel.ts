import { isNullish } from '@minvws/mgo-fhir-data/utils/isNullish/isNullish.js';
import { useIntl } from 'react-intl';

export function useUnknownLabel<T>(value: T) {
    const intl = useIntl();
    const unknownLabel = intl.formatMessage({ id: 'fhir.unknown' });
    return isNullish(value) ? unknownLabel : (value as NonNullable<T>);
}
