import { type Nullable } from '@minvws/mgo-utils';
import { type Element as ElementR3 } from 'fhir/r3';
import { type Element as ElementR4 } from 'fhir/r4';
import { type StringKeyOf } from 'type-fest';
type Element = ElementR3 | ElementR4;

export type ExtractKeysWithMeta<T extends object> =
    Extract<StringKeyOf<NonNullable<T>>, `_${string}`> extends `_${infer K}`
        ? K extends keyof T
            ? K
            : never
        : never;

/**
 * Filter primitive values based on certain meta data supplied in a sibling property (_key).
 * @see: https://build.fhir.org/json.html#primitive
 */
export function filterPrimitive<
    Resource extends ElementR3 | ElementR4,
    Key extends ExtractKeysWithMeta<Resource>,
    PrimitiveType = Resource[Key] extends unknown[] ? Resource[Key] : Resource[Key] | undefined,
>(
    element: Nullable<Resource>,
    key: Key,
    metaFilter: (meta: ElementR3 | ElementR4) => boolean
): PrimitiveType {
    if (!element) return undefined as PrimitiveType;

    const value = element[key];
    const valueMeta = element[`_${key}` as keyof Resource] as Element | Element[] | undefined;

    if (Array.isArray(value)) {
        if (!Array.isArray(valueMeta)) {
            return [] as PrimitiveType;
        }

        return value.filter((_x, i) => {
            const meta = valueMeta[i];
            return meta && metaFilter(meta);
        }) as PrimitiveType;
    }

    if (valueMeta && metaFilter(valueMeta as Element)) {
        return value as PrimitiveType;
    }

    return undefined as PrimitiveType;
}
