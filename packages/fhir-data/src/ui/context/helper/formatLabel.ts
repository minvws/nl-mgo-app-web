import { type FhirIntlShape, type FhirMessagesIds } from '@minvws/mgo-mgo-intl';
import { snakeCase } from 'lodash';
import { isValueType } from '../../../parse/types';

const zibPropertyLabelRegexp = /^(r[34])\.(\w+)\./;

/**
 * Attempts to translate the label using several fallbacks if the initial label is not available.
 *
 * Given the label: `r3.zib_medication_use.medication_reference` it will try the following options:
 *
 * - r3.zib_medication_use.medication_reference     // the initial label first
 * - r3.zib_medication_use.medication               // the label without the type extension
 * - fhir.x.medication_reference                    // a generic "x" property label
 * - (fallback)                                     // a fallback label if provided
 */
export function createLabelFormatter(intl: FhirIntlShape) {
    const hasMessage = (id: string): id is FhirMessagesIds =>
        Object.prototype.hasOwnProperty.call(intl.messages, id);

    return function formatLabel(
        label: FhirMessagesIds | string,
        value: unknown,
        fallbackLabel?: FhirMessagesIds
    ) {
        if (hasMessage(label)) {
            return intl.formatMessage({ id: label });
        }

        let valueType: string | null = null;
        if (isValueType(value)) {
            valueType = value._type;
        } else if (Array.isArray(value) && isValueType(value[0])) {
            valueType = value[0]._type;
        }

        if (valueType) {
            const typeExtension = `_${snakeCase(valueType)}`;
            const labelWithoutTypeExtension = label.substring(0, label.lastIndexOf(typeExtension));
            if (label.endsWith(typeExtension) && hasMessage(labelWithoutTypeExtension)) {
                return intl.formatMessage({ id: labelWithoutTypeExtension });
            }
        }

        if (zibPropertyLabelRegexp.test(label)) {
            const genericPropertyLabel = label.replace(zibPropertyLabelRegexp, 'fhir.x.');
            if (hasMessage(genericPropertyLabel)) {
                return intl.formatMessage({ id: genericPropertyLabel });
            }
        }

        if (fallbackLabel && hasMessage(fallbackLabel)) {
            return intl.formatMessage({ id: fallbackLabel });
        }

        // Let intl handle the missing translation error
        return intl.formatMessage({ id: label as FhirMessagesIds });
    };
}
