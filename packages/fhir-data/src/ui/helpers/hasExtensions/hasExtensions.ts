import { isNullish, type Nullable } from '@minvws/mgo-mgo-utils';
import { isExtensionValue, type ValueType } from '../../../parse/types';

function isOrHasExtensionsDeep<T extends ValueType>(value: Nullable<T>): boolean {
    if (isNullish(value)) {
        return false;
    }

    if (isExtensionValue(value)) {
        return true;
    }

    if (Array.isArray(value)) {
        return value.some((item) => isOrHasExtensionsDeep(item));
    }

    if (typeof value === 'object') {
        return Object.values(value).some((item) => isOrHasExtensionsDeep(item));
    }

    return false;
}

export function hasExtensions<T extends ValueType>(value: Nullable<T>): boolean {
    if (isNullish(value)) {
        return false;
    }

    return Object.values(value).some((item) => isOrHasExtensionsDeep(item));
}
