import { isNullish, type Nullable } from '@minvws/mgo-utils';
import { upperFirst } from 'lodash-es';
import { type StringKeyOf } from 'type-fest';
import * as type from '../../type/index.js';

type Parsers = typeof type;
export type ParserKey = keyof Parsers;

export type ReturnTypeParser<Type, F = Type extends ParserKey ? Parsers[Type] : never> = F extends (
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
export type ExtractValueTypes<T extends object, Prefix extends string> =
    Extract<
        StringKeyOf<NonNullable<T>>,
        `${Prefix}${Capitalize<ParserKey>}`
    > extends `${Prefix}${infer ValueType}`
        ? Uncapitalize<ValueType> extends ParserKey
            ? Uncapitalize<ValueType>
            : never
        : never;

export function valueX<T extends object, Prefix extends string = 'value'>(
    value: Nullable<T>,
    valueXType: ExtractValueTypes<NonNullable<T>, Prefix>,
    valuePrefix: Prefix = 'value' as Prefix
) {
    if (isNullish(value)) return;

    const parser = type[valueXType as ParserKey] as (
        arg: unknown
    ) => ReturnTypeParser<typeof valueXType>;

    if (!parser) {
        throw new Error(`Failed to find parser for ${valueXType}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const valueX = (value as any)[`${valuePrefix}${upperFirst(valueXType)}`];
    return parser(valueX);
}
