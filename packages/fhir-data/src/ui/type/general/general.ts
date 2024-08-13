import {
    type MgoAnnotation,
    type MgoCodeableConcept,
    type MgoCoding,
    type MgoDuration,
    type MgoIdentifier,
    type MgoPeriod,
    type MgoQuantity,
    type MgoRange,
    type MgoRatio,
} from '../../../parse/type';
import { type Nullable } from '../../../types/Nullable';
import { format } from '../../format';
import { changeDescriptionType, multipleValue, replaceUndefined } from '../../helpers';
import { type ValueDescription, type ValueOptions } from '../../types';

export function annotation(label: string, value: Nullable<MgoAnnotation>, options?: ValueOptions) {
    return {
        label,
        display: replaceUndefined(value?.text),
        type: 'annotation',
        ...options,
    } satisfies ValueDescription;
}

export function codableConcept(
    label: string,
    value: Nullable<MgoCodeableConcept>,
    options?: ValueOptions
) {
    return changeDescriptionType(
        multipleValue(label, value, coding, options),
        'coding',
        'codable_concept'
    );
}

export function coding(label: string, value: Nullable<MgoCoding>, options?: ValueOptions) {
    const { display, code, system } = value || {};

    let displayString = display ?? '';
    const codeString = format.codeWithSystem(code, system);
    if (codeString) displayString += ` (${codeString})`;

    return {
        label,
        type: 'coding',
        display: displayString === '' ? null : displayString,
        ...options,
    } satisfies ValueDescription;
}

export function identifier(label: string, value: Nullable<MgoIdentifier>, options?: ValueOptions) {
    return {
        label,
        type: 'identifier',
        display: replaceUndefined(value?.value),
        ...options,
    } satisfies ValueDescription;
}

export function period(label: string, value: Nullable<Partial<MgoPeriod>>, options?: ValueOptions) {
    return [
        {
            label: `${label}.start`,
            type: `period.start`,
            display: replaceUndefined(format.dateTime(value?.start)),
            ...options,
        },
        {
            label: `${label}.end`,
            type: `period.end`,
            display: replaceUndefined(format.dateTime(value?.end)),
            ...options,
        },
    ] satisfies ValueDescription[];
}

export function quantity<T extends MgoQuantity>(
    label: string,
    value: Nullable<T>,
    options?: ValueOptions
) {
    const { value: quantityValue, unit, code, system } = value || {};

    return [
        {
            label: `${label}.value`,
            type: `quantity.value`,
            display: format.valueWithUnit(quantityValue, unit),
            ...options,
        },
        {
            label: `${label}.code`,
            type: `quantity.code`,
            display: format.codeWithSystem(code, system),
            ...options,
        },
    ] satisfies ValueDescription[];
}

export function duration(label: string, value: Nullable<MgoDuration>, options?: ValueOptions) {
    const values = quantity(label, value, options);
    return values.map((valueDescription) =>
        changeDescriptionType(valueDescription, 'quantity', 'duration')
    );
}

export function ratio(label: string, value: Nullable<MgoRatio>, options?: ValueOptions) {
    return [
        ...quantity(`${label}.numerator`, value?.numerator, options).map((valueDescription) =>
            changeDescriptionType(valueDescription, 'quantity', 'ratio.numerator')
        ),
        ...quantity(`${label}.denominator`, value?.denominator, options).map((valueDescription) =>
            changeDescriptionType(valueDescription, 'quantity', 'ratio.denominator')
        ),
    ] satisfies ValueDescription[];
}

export function range(label: string, value: Nullable<MgoRange>, options?: ValueOptions) {
    return [
        ...quantity(`${label}.low`, value?.low, options).map((valueDescription) =>
            changeDescriptionType(valueDescription, 'quantity', 'range.low')
        ),
        ...quantity(`${label}.high`, value?.high, options).map((valueDescription) =>
            changeDescriptionType(valueDescription, 'quantity', 'range.high')
        ),
    ] satisfies ValueDescription[];
}
