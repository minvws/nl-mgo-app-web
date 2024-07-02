import { type StringKeys } from '$/types/StringKeys';
import { type ReactNode } from 'react';
import { type MessageDescriptor } from 'react-intl';

export type Description = {
    key: string;
    value: unknown;
    term: MessageDescriptor;
    details: ReactNode;
};

export function createDescriptions<T extends object>(
    value: T,
    order: StringKeys<T>[]
): Description[] {
    type Key = StringKeys<T>;

    const sortByOrder = ([keyA]: [string, unknown], [keyB]: [string, unknown]) =>
        order.indexOf(keyA as Key) - order.indexOf(keyB as Key);

    return Object.entries(value)
        .filter(([key]) => order.includes(key as Key))
        .sort(sortByOrder)
        .map(([key, value]) => ({
            key,
            value,
            term: { id: `fhir.${key as Key}` as MessageDescriptor['id'] },
            details: value,
        }));
}
