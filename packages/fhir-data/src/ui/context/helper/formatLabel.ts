import { type FhirIntlShape, type FhirMessagesIds } from '@minvws/mgo-mgo-intl';
import { snakeCase } from 'lodash';
import { isValueType } from '../../../parse/types';

export function createLabelFormatter(intl: FhirIntlShape) {
    const hasMessage = (id: string): id is FhirMessagesIds =>
        Object.prototype.hasOwnProperty.call(intl.messages, id);

    return function formatLabel(label: FhirMessagesIds | string, value: unknown) {
        if (hasMessage(label)) {
            return intl.formatMessage({ id: label });
        }

        if (isValueType(value)) {
            const typeExtension = `_${snakeCase(value._type)}`;
            const labelWithoutTypeExtension = label.substring(0, label.lastIndexOf(typeExtension));
            if (label.endsWith(typeExtension) && hasMessage(labelWithoutTypeExtension)) {
                return intl.formatMessage({ id: labelWithoutTypeExtension });
            }
        }

        // Let intl handle the missing translation error
        return intl.formatMessage({ id: label as FhirMessagesIds });
    };
}
