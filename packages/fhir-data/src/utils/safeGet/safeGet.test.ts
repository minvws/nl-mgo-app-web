import { faker } from '@faker-js/faker';
import { expect, test } from 'vitest';
import { SafeGetFunc, safeGet } from './safeGet';

type TestData = {
    foo?: string;
    faa?: number | null;
    bar?: {
        baz?: number;
        qux?: {
            quxBar?: number;
        }[];
    };
    arr?: {
        arrFoo?: string;
        arrBool?: boolean;
    }[];
};

const quxBarNumber = faker.number.int();
const fooString = faker.lorem.word();

const randomString = faker.lorem.word();
const randomNumber = faker.number.int();
const randomBool = faker.datatype.boolean();

const testData: TestData = {
    foo: fooString,
    faa: null,
    bar: { qux: [{ quxBar: quxBarNumber }] },
};

test.each<[SafeGetFunc<TestData>, unknown]>([
    [(x) => x.foo, fooString],
    [(x) => x.faa, null],
    [(x) => x.bar!.baz, undefined],
    [(x) => x.bar!.qux![0].quxBar, quxBarNumber],
    [(x) => x.bar!.qux![1].quxBar, undefined],
    [(x) => x.bar!.qux, [{ quxBar: quxBarNumber }]],
    [(x) => x.arr, undefined],
    [(x) => x.arr![0].arrBool, undefined],
    [
        () => {
            throw new TypeError();
        },
        undefined,
    ],
])('safeGet safely retrieves available data and ignores any TypeErrors', (getFunc, expected) => {
    expect(safeGet(testData, getFunc)).toEqual(expected);
});

test.each<[SafeGetFunc<TestData>, unknown, unknown]>([
    [(x) => x.foo, faker.lorem.word(), fooString],
    [(x) => x.faa, randomString, null],
    [(x) => x.bar!.baz, randomNumber, randomNumber],
    [(x) => x.bar!.qux![0].quxBar, faker.number.int(), quxBarNumber],
    [(x) => x.bar!.qux![1].quxBar, randomNumber, randomNumber],
    [(x) => x.bar!.qux, [], [{ quxBar: quxBarNumber }]],
    [(x) => x.arr, [{ arrFoo: randomString }], [{ arrFoo: randomString }]],
    [(x) => x.arr![0].arrBool, randomBool, randomBool],
    [
        () => {
            throw new TypeError();
        },
        randomString,
        randomString,
    ],
])(
    'safeGet safely retrieves available data or default value if not available',
    (getFunc, defaultValue, expected) => {
        expect(safeGet(testData, getFunc, defaultValue)).toEqual(expected);
    }
);

test('safeGet can handle undefined values', () => {
    const result = safeGet(undefined as TestData | undefined, (x) => x.bar?.baz);
    expect(result).toBe(undefined);
});

test('safeGet can handle undefined values in combination with a default value', () => {
    const randomNumber = faker.number.int();
    const result = safeGet(undefined as TestData | undefined, (x) => x.bar?.baz, randomNumber);
    expect(result).toBe(randomNumber);
});

test('safeGet only catches TypeErrors, not any other Errors', () => {
    expect(() =>
        safeGet({}, () => {
            throw new Error('NOT a TypeError');
        })
    ).toThrowError('NOT a TypeError');
});
