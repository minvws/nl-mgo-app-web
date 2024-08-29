import { upperFirst } from 'lodash';
import { type Nullable } from '../../../types/Nullable';
import { isNullish } from '../../../utils/isNullish/isNullish';
import * as parse from '../../type';
import { type StringKeys } from '../../../types/StringKeys';

type ParseMap = typeof parse;
export type ParserKey = keyof ParseMap;

export type ReturnTypeParser<
    Type,
    F = Type extends ParserKey ? ParseMap[Type] : never,
> = F extends (
    ...args: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
) => any // eslint-disable-line @typescript-eslint/no-explicit-any
    ? ReturnType<F>
    : never;

/**
 * Extracts valid value types from an object based on the
 * object itself and the available parsers.
 *
 * e.g.
 * type Test = {
 *   valueCodeableConcept: { coding: [{ code: string }] },
 *   valueBoolean: boolean,
 *   valueFoo: string,
 * };
 * ValidXTypes<Test>; // 'codeableConcept' | 'boolean'
 */
export type ExtractValueTypes<T extends object> =
    Extract<
        StringKeys<NonNullable<T>>,
        `value${Capitalize<ParserKey>}`
    > extends `value${infer ValueType}`
        ? Uncapitalize<ValueType> extends ParserKey
            ? Uncapitalize<ValueType>
            : never
        : never;

export function valueX<T extends object>(
    value: Nullable<T>,
    valueXType: ExtractValueTypes<NonNullable<T>>
) {
    if (isNullish(value)) return;

    const parser = parse[valueXType as ParserKey] as (
        arg: unknown
    ) => ReturnTypeParser<typeof valueXType>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const valueX = (value as any)[`value${upperFirst(valueXType)}`];
    return parser(valueX);
}
