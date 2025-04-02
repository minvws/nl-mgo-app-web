import { type UiElement, type UiFunction } from '../types';

import { type FhirMessagesIds } from '@minvws/mgo-mgo-intl';
import type * as parse from '../../parse/type';
import { map } from '../../utils';
import { type HealthUiSchemaContext } from '../context';

type Parsers = typeof parse;

export type MgoValueType = NonNullable<ReturnType<Parsers[keyof Parsers]>>;
type Type = MgoValueType['_type'];
type MgoByType<T extends Type> = Extract<MgoValueType, { _type: T }>;

type SingleTypeUiFunctionMap = {
    [T in Type]: UiFunction<MgoByType<T>, UiElement | UiElement[]>;
};
type MultipleTypeUiFunctionMap = {
    [T in Type]: UiFunction<MgoByType<T>[], UiElement | UiElement[]>;
};

export function getUiHelpers(context: HealthUiSchemaContext) {
    const { ui } = context;
    const singleUiTypeMap: SingleTypeUiFunctionMap = {
        annotation: ui.annotation,
        attachment: (_label, value) => ui.attachment(value),
        boolean: ui.boolean,
        code: ui.code,
        codeableConcept: ui.codeableConcept,
        coding: ui.coding,
        date: ui.date,
        dateTime: ui.dateTime,
        decimal: ui.decimal,
        duration: ui.duration,
        identifier: ui.identifier,
        instant: ui.instant,
        integer: ui.integer,
        integer64: ui.integer64,
        period: ui.period,
        positiveInt: ui.positiveInt,
        quantity: ui.quantity,
        range: ui.range,
        ratio: ui.ratio,
        reference: ui.reference,
        string: ui.string,
        unsignedInt: ui.unsignedInt,
    };

    const multipleUiTypeMap: Partial<MultipleTypeUiFunctionMap> = {
        annotation: ui.annotation,
        code: ui.code,
        codeableConcept: ui.codeableConcept,
        coding: ui.coding,
        dateTime: ui.dateTime,
        identifier: ui.identifier,
        instant: ui.instant,
        reference: ui.reference,
        string: ui.string,
    };

    function handleSingeUiType<T extends Type>(
        label: FhirMessagesIds,
        value: MgoByType<T>
    ): UiElement | UiElement[] {
        const uiHelper = singleUiTypeMap[value._type];
        if (!uiHelper) {
            throw new Error(`No ui helper found for type "${value._type}"`);
        }
        return uiHelper(label, value);
    }

    function handleMultipleUiTypes<T extends Type>(
        label: FhirMessagesIds,
        value: MgoByType<T>[]
    ): UiElement | UiElement[] {
        const uiHelper = multipleUiTypeMap[value[0]._type];
        if (uiHelper) {
            return uiHelper(label, value);
        }

        return map(value, (x) => handleSingeUiType(label, x), true);
    }

    return { handleSingeUiType, handleMultipleUiTypes };
}

export type UiElementGeneratorHelpers = ReturnType<typeof getUiHelpers>;
