import { upperFirst } from 'lodash';
import { type StringKeys } from '../../../types/StringKeys';
import { isNullish } from '../../../utils/isNullish/isNullish';
import { parse } from '../../type';
import { type Nullable } from '../../../types/Nullable';

type ParseMap = typeof parse;
type TypeKey = keyof ParseMap;
type ReturnParseType<
    T extends string,
    F = T extends keyof ParseMap ? ParseMap[T] : never,
> = F extends (...args: any[]) => any ? ReturnType<F> : never; // eslint-disable-line @typescript-eslint/no-explicit-any

export type KeyXParsableTypes = keyof ParseMap;
export type KeyXParsedType<T extends keyof ParseMap> = ReturnParseType<T>;

type KeyX<K extends string> = K extends `${infer T}${Capitalize<TypeKey>}` ? T : never;
type KeyXTypes<K extends string, O extends object> =
    Extract<keyof O, `${K}${Capitalize<TypeKey>}`> extends `${K}${infer T}`
        ? Uncapitalize<T>
        : never;

export function keyX<
    T extends object,
    K extends KeyX<StringKeys<T>>,
    XType extends KeyXTypes<K, T>,
>(value: Nullable<T>, xKey: K, xType: XType) {
    if (isNullish(value)) return null;

    const parser = parse[xType as TypeKey];
    const keyXValue = value[`${xKey}${upperFirst(xType)}` as keyof T];
    const parsedValue = parser(keyXValue as any); // eslint-disable-line @typescript-eslint/no-explicit-any
    return parsedValue as ReturnParseType<typeof xType>;
}

export function valueX<
    T extends object,
    K extends Extract<KeyX<StringKeys<T>>, 'value'>,
    XType extends KeyXTypes<K, T>,
>(value: Nullable<T>, xType: XType) {
    if (isNullish(value)) return null;

    return keyX(value, 'value' as K, xType);
}
