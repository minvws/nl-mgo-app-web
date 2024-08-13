import { type Awaitable, test } from 'vitest';

type TestFunction<T> = (data: T) => Awaitable<void>;
type FactoryFunction<T> = (...args: any) => T; // eslint-disable-line @typescript-eslint/no-explicit-any

const TEST_SET_LENGTH = 5;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createTestSet<T extends (...args: any) => any>(factory: T): ReturnType<T>[] {
    return Array.from({ length: TEST_SET_LENGTH }, factory) as ReturnType<T>[];
}

/**
 * Because we're using randomized faker data, we can run some
 * tests multiple times to improve the reliability of the code
 */
export function testSet<T>(
    description: string,
    factory: FactoryFunction<T>,
    testFunc: TestFunction<T>,
    logValue: boolean = true
) {
    test.each(createTestSet(factory))(`%#: ${description}${logValue ? ' - %j' : ''}`, testFunc);
}
