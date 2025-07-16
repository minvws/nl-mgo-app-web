import { isNullish, type Nullable } from '@minvws/mgo-utils';
import { type PrimitiveValueType } from '../../types';

// The current (json schema) type export can not handle a double generic type as an Alias, so we need to ignore this rules here
// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-empty-interface
export interface MgoCode<T extends string = string> extends PrimitiveValueType<'code', T> {}

export function code<T extends string>(value: Nullable<T>): MgoCode<T> | undefined {
    if (isNullish(value)) return;
    return {
        _type: 'code',
        value,
    };
}
