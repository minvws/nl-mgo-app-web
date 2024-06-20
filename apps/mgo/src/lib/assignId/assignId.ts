import { uniqueId } from 'lodash';

type ObjectWithoutId = {
    [key: string]: unknown;
    id?: never;
};

export type WithId<T extends ObjectWithoutId> = T & { id: string };

export function assignId<T extends ObjectWithoutId>(value: T): WithId<T> {
    return {
        ...value,
        id: uniqueId(),
    };
}
