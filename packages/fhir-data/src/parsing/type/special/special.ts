import { type Reference } from '../../../fhir';
import { EMPTY_VALUE } from '../emptyValue';

export function reference(value?: Reference) {
    if (!value) return EMPTY_VALUE;
    const { reference, display } = value;
    return {
        reference,
        display,
    };
}
