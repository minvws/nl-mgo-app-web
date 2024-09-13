import {
    type MultipleGroupValue,
    type MultipleValue,
    type ReferenceValue,
    type SingleValue,
} from '../../types';

export function changeDescriptionType<
    T extends SingleValue | MultipleValue | MultipleGroupValue | ReferenceValue,
>(value: T, oldType: string, newType: string) {
    const regexp = new RegExp(`^${oldType}`);
    return {
        ...value,
        type: value.type.replace(regexp, newType),
    };
}
