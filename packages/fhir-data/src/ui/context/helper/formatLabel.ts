import { type FhirIntlShape, type FhirMessagesIds } from '@minvws/mgo-intl';
import { snakeCase } from 'lodash';
import { isValueType } from '../../../parse/types';

const fhirXLabelRegexp = /^r[34]\.[\w.]+\./;

type FallbackLabels = {
    labelWithoutType: string | null;
    fhirXLabel: string | null;
    fhirXLabelWithoutType: string | null;
};

function getFallbackLabels(label: string, value: unknown): FallbackLabels {
    let typeExtension: string | null = null;
    if (isValueType(value)) {
        typeExtension = `_${snakeCase(value._type)}`;
    } else if (Array.isArray(value) && isValueType(value[0])) {
        typeExtension = `_${snakeCase(value[0]._type)}`;
    }

    const labels: FallbackLabels = {
        labelWithoutType: null,
        fhirXLabel: null,
        fhirXLabelWithoutType: null,
    };

    if (typeExtension && label.endsWith(typeExtension)) {
        labels.labelWithoutType = label.substring(0, label.lastIndexOf(typeExtension));
    }

    if (fhirXLabelRegexp.test(label)) {
        labels.fhirXLabel = label.replace(fhirXLabelRegexp, 'fhir.x.');
        if (typeExtension) {
            labels.fhirXLabelWithoutType = labels.fhirXLabel.substring(
                0,
                labels.fhirXLabel.lastIndexOf(typeExtension)
            );
        }
    }

    return labels;
}

/**
 * Attempts to translate the label using several fallbacks if the initial label is not available.
 *
 * Given the label: `r3.resource.foo.bar_reference` it will try the following options:
 *
 * - r3.resource.foo.bar_reference      // the initial label first
 * - r3.resource.foo.bar                // the label without the type extension
 * - (fallback)                         // a fallback label if provided
 * - fhir.x.bar_reference               // a generic "x" property label
 * - fhir.x.bar                         // a generic "x" property label without the type extension
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

        const { labelWithoutType, fhirXLabel, fhirXLabelWithoutType } = getFallbackLabels(
            label,
            value
        );

        if (labelWithoutType && hasMessage(labelWithoutType)) {
            return intl.formatMessage({ id: labelWithoutType });
        }

        if (fallbackLabel && hasMessage(fallbackLabel)) {
            return intl.formatMessage({ id: fallbackLabel });
        }

        if (fhirXLabel && hasMessage(fhirXLabel)) {
            return intl.formatMessage({ id: fhirXLabel });
        }

        if (fhirXLabelWithoutType && hasMessage(fhirXLabelWithoutType)) {
            return intl.formatMessage({ id: fhirXLabelWithoutType });
        }

        // Let intl handle the missing translation error
        return intl.formatMessage({ id: label as FhirMessagesIds });
    };
}
