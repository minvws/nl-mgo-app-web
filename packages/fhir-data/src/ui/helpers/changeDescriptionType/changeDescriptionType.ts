import { type ValueDescription } from '../../types';

export function changeDescriptionType<T extends ValueDescription>(
    value: T,
    oldType: string,
    newType: string
) {
    const regexp = new RegExp(`^${oldType}`);
    return {
        ...value,
        type: value.type.replace(regexp, newType),
    };
}
