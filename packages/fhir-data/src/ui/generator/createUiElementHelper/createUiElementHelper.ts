/* eslint-disable @typescript-eslint/no-explicit-any */

import { type FhirMessagesIds } from '@minvws/mgo-mgo-intl';
import { type MgoType, type MgoTypeId } from '../../../parse/types';
import { map } from '../../../utils';
import { type HealthUiSchemaContext } from '../../context';
import { type HealthUiGroup, type UiElement, type UiFunction } from '../../types';

type SingleTypeUiFunctionMap = {
    [T in MgoTypeId]: UiFunction<MgoType<T>, UiElement | UiElement[] | HealthUiGroup, any, any>;
};
type MultipleTypeUiFunctionMap = {
    [T in MgoTypeId]: UiFunction<MgoType<T>[], UiElement | UiElement[] | HealthUiGroup, any, any>;
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
        simpleQuantity: ui.simpleQuantity,
        string: ui.string,
        time: ui.time,
        unsignedInt: ui.unsignedInt,
        // complex types
        timing: ui.timing,
        sampledData: ui.sampledData,
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
        value: MgoType<T> | MgoType<T>[]
    ): UiElement | UiElement[] | HealthUiGroup {
        if (Array.isArray(value)) {
            const uiHelper = multipleUiTypeMap[value[0]._type as T];
            if (uiHelper) {
                return uiHelper(label, value);
            }
            return map(value, (x) => createUiElement(label, x), true);
        }

        const uiHelper = singleUiTypeMap[value._type as T];
        if (!uiHelper) {
            throw new Error(`No ui helper found for type "${value._type}"`);
        }
        return uiHelper(label, value);
    };
}
