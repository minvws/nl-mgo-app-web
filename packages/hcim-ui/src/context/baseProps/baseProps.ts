import { FhirIntlShape, FhirMessagesIds } from '@minvws/mgo-intl';
import { UiFunctionOptions } from '../../types/context.js';
import { createLabelFormatter } from '../formatLabel.js';

export function createBaseProps(intl: FhirIntlShape) {
    const formatLabel = createLabelFormatter(intl);

    return function baseProps(
        label: FhirMessagesIds | string,
        value: unknown,
        options: UiFunctionOptions = {}
    ) {
        return {
            id: label,
            label: formatLabel(label, value, options.defaultLabel),
        };
    };
}
