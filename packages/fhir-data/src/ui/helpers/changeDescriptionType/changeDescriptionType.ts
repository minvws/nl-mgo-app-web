import {
    type MultipleGroupValue,
    type MultipleValue,
    type Reference,
    type SingleValue,
} from '../../types';

export function changeDescriptionType<
    T extends SingleValue | MultipleValue | MultipleGroupValue | Reference,
>(value: T, oldType: string, newType: string) {
    const regexp = new RegExp(`^${oldType}`);
    return {
        ...value,
        type: value.type.replace(regexp, newType),
    };
}
