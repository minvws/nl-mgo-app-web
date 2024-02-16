import { expect, test } from 'vitest';
import { findByUse, type WithUse } from './findByUse';

interface TestData extends WithUse {
    id: number;
    use?: 'a' | 'b' | 'c' | 'd' | 'e';
}

test.each<[TestData[] | undefined, (TestData['use'] | undefined)[], TestData | undefined]>([
    [[{ id: 1, use: 'a' }], ['a'], { id: 1, use: 'a' }],
    [[{ id: 1, use: 'a' }], ['b'], undefined],
    [[{ id: 1, use: 'a' }], [undefined], undefined],
    [[{ id: 1 }], [undefined], { id: 1 }],
    [[{ id: 1 }], [], undefined],
    [[], [], undefined],
    [[], ['a'], undefined],
    [undefined, ['a'], undefined],
    [
        [{ id: 2, use: 'b' }, { id: 1, use: 'a' }, { id: 4 }, { id: 3, use: 'c' }],
        ['a'],
        { id: 1, use: 'a' },
    ],
    [
        [{ id: 2, use: 'b' }, { id: 1, use: 'a' }, { id: 4 }, { id: 3, use: 'c' }],
        [undefined],
        { id: 4 },
    ],
    [
        [{ id: 2, use: 'b' }, { id: 1, use: 'a' }, { id: 4 }, { id: 3, use: 'c' }],
        ['e', undefined, 'b'],
        { id: 4 },
    ],
    [
        [
            { id: 2, use: 'b' },
            { id: 1, use: 'a' },
            { id: 3, use: 'c' },
        ],
        ['e', undefined, 'b'],
        { id: 2, use: 'b' },
    ],
])(
    'findByUse returns the first value that matches the use - %#',
    (values, usePriority, expected) => {
        expect(findByUse(values, usePriority)).toEqual(expected);
    }
);

test.each<
    [
        TestData[] | undefined,
        (TestData['use'] | undefined)[],
        TestData | undefined,
        TestData | undefined,
    ]
>([
    [[{ id: 1, use: 'a' }], ['a'], { id: 5, use: 'e' }, { id: 1, use: 'a' }],
    [[{ id: 1, use: 'a' }], ['b'], { id: 5, use: 'e' }, { id: 5, use: 'e' }],
    [[{ id: 1, use: 'a' }], [undefined], { id: 5, use: 'e' }, { id: 5, use: 'e' }],
    [[{ id: 1 }], [undefined], { id: 5, use: 'e' }, { id: 1 }],
    [[{ id: 1 }], [], { id: 5, use: 'e' }, { id: 5, use: 'e' }],
    [[], [], { id: 5, use: 'e' }, { id: 5, use: 'e' }],
    [
        [{ id: 2, use: 'b' }, { id: 1, use: 'a' }, { id: 4 }, { id: 3, use: 'c' }],
        ['a'],
        { id: 5, use: 'e' },
        { id: 1, use: 'a' },
    ],
    [
        [{ id: 2, use: 'b' }, { id: 1, use: 'a' }, { id: 4 }, { id: 3, use: 'c' }],
        [undefined],
        { id: 5, use: 'e' },
        { id: 4 },
    ],
    [
        [{ id: 2, use: 'b' }, { id: 1, use: 'a' }, { id: 4 }, { id: 3, use: 'c' }],
        ['e', undefined, 'b'],
        { id: 5, use: 'e' },
        { id: 4 },
    ],
    [
        [
            { id: 1, use: 'a' },
            { id: 3, use: 'c' },
        ],
        ['e', undefined, 'b'],
        { id: 5, use: 'e' },
        { id: 5, use: 'e' },
    ],
])(
    'findByUse returns the first value that matches the use, or default if no matches are found - %#',
    (values, usePriority, defaultValue, expected) => {
        expect(findByUse(values, usePriority, defaultValue)).toEqual(expected);
    }
);
