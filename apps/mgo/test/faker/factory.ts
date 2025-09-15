import { defaultsDeep } from 'lodash';
import { type PartialDeep } from 'type-fest';

type MockData<T> = object | Array<T>;

export type MockDataFactory<T extends MockData<T>> = (partialData?: PartialDeep<T>) => T;

/**
 * Returns a function that can be used for creating test data.
 * The returned function will merge the default data with any partial data that is passed.
 * @example
 *
 * type Foo = {bar :string, baz: number};
 *
 * const foo = createMockFactory<Foo>(() => ({
 *   bar: faker.string.sample()
 *   bar: faker.number.int()
 * }));
 *
 * const testFoo = foo(); // { bar: 'Zo!.:*e>wR', baz: 2900970162509863 }
 * const testFoo2 = foo({bar: 'foobar'}); // { bar: 'foobar', baz: 95235991 }
 */
export function createMockFactory<T extends MockData<T>>(defaultData: () => T): MockDataFactory<T> {
    const isArray = Array.isArray(defaultData());

    return (partialData) => defaultsDeep(isArray ? [] : {}, partialData, defaultData());
}
