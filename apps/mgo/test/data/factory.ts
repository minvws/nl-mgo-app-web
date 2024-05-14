import { defaultsDeep } from 'lodash';

type MockData<T> = GenericObject | Array<T>;

export type MockDataFactory<T extends MockData<T>> = {
    (partialData?: DeepPartial<T>): T;
};

/**
 * Returns a function that can be used for creating test data.
 */
export function createMockDataFactory<T extends MockData<T>>(
    defaultData: () => T
): MockDataFactory<T> {
    const isArray = Array.isArray(defaultData());

    return (partialData) => defaultsDeep(isArray ? [] : {}, partialData, defaultData());
}
