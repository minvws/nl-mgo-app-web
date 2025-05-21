import { isNullish, type Nullable } from '@minvws/mgo-mgo-utils';
import { type PrimitiveValueType } from '../../types';

export interface MgoCode<T extends string = string> extends PrimitiveValueType<'code', T> {}

export function code<T extends string>(value: Nullable<T>): MgoCode<T> | undefined {
    if (isNullish(value)) return;
    return {
        _type: 'code',
        value,
    };
}
