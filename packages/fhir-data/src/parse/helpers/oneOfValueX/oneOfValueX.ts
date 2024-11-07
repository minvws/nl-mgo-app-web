import { capitalize } from 'lodash';
import { type Nullable } from '../../../types/Nullable';
import { isNullish } from '../../../utils';
import { isNonNullish } from '../../../utils/isNonNullish/isNonNullish';
import {
    type ExtractValueTypes,
    type ParserKey,
    type ReturnTypeParser,
    valueX,
} from '../valueX/valueX';

type KeyFromValueType<
    Prefix extends string,
    ValueType extends string,
> = `${Prefix}${Capitalize<ValueType>}`;

type ValueTypeFromKey<P extends string, T extends string> = T extends `${P}${infer ValueType}`
    ? Uncapitalize<ValueType>
    : never;

type ValueTypeObject<Prefix extends string, Types extends string> = {
    [K in KeyFromValueType<Prefix, Types>]?: ReturnTypeParser<ValueTypeFromKey<Prefix, K>>;
};

export function oneOfValueX<
    T extends object,
    Types extends ParserKey,
    Prefix extends string = 'value',
>(
    value: Nullable<T>,
    valueArray: Types[],
    valuePrefix: Prefix = 'value' as Prefix
): ValueTypeObject<Prefix, Types> {
    if (isNullish(value)) return {};

    for (const valueKey of valueArray) {
        const parsedValue = valueX<typeof value, Prefix>(
            value,
            valueKey as ExtractValueTypes<T, Prefix>,
            valuePrefix
        );

        if (isNonNullish(parsedValue)) {
            return {
                [`${valuePrefix}${capitalize(valueKey)}`]: parsedValue,
            } as ValueTypeObject<Prefix, Types>;
        }
    }

    return {};
}
