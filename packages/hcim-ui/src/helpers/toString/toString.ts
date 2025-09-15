import { isNullish, type Nullable } from '@minvws/mgo-utils';

export function toString<T extends string | boolean>(value?: Nullable<T>) {
    if (isNullish(value)) return;
    return `${value}`;
}
