import { isNullish } from '../../../utils';
import { type Nullable } from '../../../types/Nullable';

export function codeWithSystem(code: Nullable<string>, system: Nullable<string>) {
    if (isNullish(code) || code === '') return null;
    if (isNullish(system) || system === '') return code;

    return `${code} in code systeem ${system}`;
}
