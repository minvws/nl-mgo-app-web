import { type FhirMessagesIds } from '@minvws/mgo-mgo-intl';
import type * as typeParsers from '../../../parse/type';
import { map } from '../../../utils';
import { type HealthUiSchemaContext } from '../../context';
import { type HealthUiGroup, type UiElement, type UiFunction } from '../../types';

type TypeParsers = typeof typeParsers;

export type MgoType = NonNullable<ReturnType<TypeParsers[keyof TypeParsers]>>;
type MgoTypeId = MgoType['_type'];
type MgoTypeByTypeId<T extends MgoTypeId> = Extract<MgoType, { _type: T }>;

type SingleTypeUiFunctionMap = {
    [T in MgoTypeId]: UiFunction<MgoTypeByTypeId<T>, UiElement | UiElement[] | HealthUiGroup>;
};
type MultipleTypeUiFunctionMap = {
    [T in MgoTypeId]: UiFunction<MgoTypeByTypeId<T>[], UiElement | UiElement[] | HealthUiGroup>;
};

export function createUiElementHelper({ ui }: HealthUiSchemaContext) {
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
        sampledData: ui.sampledData,
        simpleQuantity: ui.simpleQuantity,
        string: ui.string,
        time: ui.time,
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

    return function createUiElement<T extends MgoTypeId>(
        label: FhirMessagesIds,
        value: MgoTypeByTypeId<T> | MgoTypeByTypeId<T>[]
    ): UiElement | UiElement[] | HealthUiGroup {
        if (Array.isArray(value)) {
            const uiHelper = multipleUiTypeMap[value[0]._type];
            if (uiHelper) {
                return uiHelper(label, value);
            }
            return map(value, (x) => createUiElement(label, x), true);
        }

        const uiHelper = singleUiTypeMap[value._type];
        if (!uiHelper) {
            throw new Error(`No ui helper found for type "${value._type}"`);
        }
        return uiHelper(label, value);
    };
}
