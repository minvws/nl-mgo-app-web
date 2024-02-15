import { faker } from '@faker-js/faker';
import { expect, test } from 'vitest';
import { safeGetBulk } from './safeGetBulk';

type TestData = {
    foo?: string;
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

test('safeGetBulk safely retrieves available data and ignores any TypeErrors', () => {
    const randomInt = faker.number.int();
    const randomString = faker.lorem.word();

    expect(
        safeGetBulk(
            {
                foo: randomString,
                bar: { qux: [{ quxBar: randomInt }] },
            } as TestData,
            {
                fooString: (x) => x.foo,
                bazNumber: (x) => x.bar!.baz,
                qux0: (x) => x.bar!.qux![0].quxBar,
                qux1: (x) => x.bar!.qux![1].quxBar,
            }
        )
    ).toEqual({
        fooString: randomString,
        qux0: randomInt,
    });
});

test('safeGetBulk safely retrieves available data even with deeply nested configs', () => {
    const randomInt = faker.number.int();
    const randomString = faker.lorem.word();

    expect(
        safeGetBulk(
            {
                foo: faker.lorem.word(),
                bar: {
                    qux: [{ quxBar: randomInt }],
                },
                arr: [{ arrFoo: randomString }],
            } as TestData,
            {
                deep: {
                    nest: {
                        bar0: (x) => x.bar!.qux![0].quxBar,
                        bar1: (x) => x.bar!.qux![1].quxBar,
                        baz: {
                            arr: (x) => x.arr![0].arrFoo,
                        },
                    },
                },
            }
        )
    ).toEqual({
        deep: {
            nest: {
                bar0: randomInt,
                baz: {
                    arr: randomString,
                },
            },
        },
    });
});

test('safeGetBulk safely retrieves available data even with inline TypeError inducing logic', () => {
    const randomString1 = faker.lorem.word();
    const randomString2 = faker.lorem.word();

    expect(
        safeGetBulk(
            {
                arr: [
                    {
                        arrFoo: randomString1,
                        arrBool: false,
                    },
                    {
                        arrFoo: randomString2,
                        arrBool: false,
                    },
                ],
            } as TestData,
            {
                arrFooTrue: (x) => x.arr!.find((x) => x.arrBool)!.arrFoo,
                arrFooJoin: (x) => x.arr!.map((x) => x.arrFoo).join(', '),
                throwTypeError: () => {
                    throw new TypeError();
                },
            }
        )
    ).toEqual({
        arrFooJoin: `${randomString1}, ${randomString2}`,
    });
});

test('safeGetBulk safely retrieves available data and combines this with any default data available', () => {
    const randomInt = faker.number.int();
    const randomInt2 = faker.number.int();
    const randomInt3 = faker.number.int();
    const randomString = faker.lorem.word();

    expect(
        safeGetBulk(
            {
                foo: randomString,
                bar: { qux: [{ quxBar: randomInt }] },
            } as TestData,
            {
                fooString: (x) => x.foo,
                bazNumber: (x) => x.bar!.baz,
                qux0: (x) => x.bar!.qux![0].quxBar,
                qux1: (x) => x.bar!.qux![1].quxBar,
            },
            {
                fooString: faker.lorem.sentence(),
                bazNumber: randomInt2,
                qux0: faker.number.int(),
                qux1: randomInt3,
            }
        )
    ).toEqual({
        fooString: randomString,
        bazNumber: randomInt2,
        qux0: randomInt,
        qux1: randomInt3,
    });
});

test('safeGetBulk safely retrieves available data and combines this with any default data, ignoring any extra values', () => {
    const randomInt = faker.number.int();
    const randomInt2 = faker.number.int();
    const randomString = faker.lorem.word();

    expect(
        safeGetBulk(
            {
                foo: randomString,
                bar: { qux: [{ quxBar: randomInt }] },
            } as TestData,
            {
                fooString: (x) => x.foo,
                bazNumber: (x) => x.bar!.baz,
                qux0: (x) => x.bar!.qux![0].quxBar,
                qux1: (x) => x.bar!.qux![1].quxBar,
            },
            {
                fooString: faker.lorem.sentence(),
                bazNumber: randomInt2,
                qux0: faker.number.int(),
                extra: faker.lorem.word(),
                extra2: faker.number.int(),
            }
        )
    ).toEqual({
        fooString: randomString,
        bazNumber: randomInt2,
        qux0: randomInt,
    });
});

test('safeGetBulk safely retrieves available data and combines this with any deeply nested default data,', () => {
    const randomInt = faker.number.int();
    const randomInt2 = faker.number.int();
    const randomString = faker.lorem.word();

    expect(
        safeGetBulk(
            {
                foo: faker.lorem.word(),
                bar: {
                    qux: [{ quxBar: randomInt }],
                },
                arr: [{ arrFoo: randomString }],
            } as TestData,
            {
                deep: {
                    nest: {
                        bar0: (x) => x.bar!.qux![0].quxBar,
                        bar1: (x) => x.bar!.qux![1].quxBar,
                        baz: {
                            arr: (x) => x.arr![0].arrFoo,
                        },
                    },
                },
            },
            {
                deep: {
                    nest: {
                        bar0: faker.number.int(),
                        bar1: randomInt2,
                        baz: {
                            arr: faker.lorem.word(),
                        },
                    },
                },
            }
        )
    ).toEqual({
        deep: {
            nest: {
                bar0: randomInt,
                bar1: randomInt2,
                baz: {
                    arr: randomString,
                },
            },
        },
    });
});

test('safeGetBulk can handle undefined values', () => {
    expect(
        safeGetBulk(undefined as TestData | undefined, {
            fooString: (x) => x.foo,
            bazNumber: (x) => x.bar!.baz,
            qux0: (x) => x.bar!.qux![0].quxBar,
            qux1: (x) => x.bar!.qux![1].quxBar,
        })
    ).toEqual({
        fooString: undefined,
        bazNumber: undefined,
        qux0: undefined,
        qux1: undefined,
    });
});

test('safeGetBulk can handle undefined values in combination with default values', () => {
    const randomInt1 = faker.number.int();
    const randomInt2 = faker.number.int();
    expect(
        safeGetBulk(
            undefined as TestData | undefined,
            {
                fooString: (x) => x.foo,
                bazNumber: (x) => x.bar!.baz,
                qux0: (x) => x.bar!.qux![0].quxBar,
                qux1: (x) => x.bar!.qux![1].quxBar,
            },
            {
                bazNumber: randomInt1,
                qux1: randomInt2,
            }
        )
    ).toEqual({
        fooString: undefined,
        bazNumber: randomInt1,
        qux0: undefined,
        qux1: randomInt2,
    });
});
