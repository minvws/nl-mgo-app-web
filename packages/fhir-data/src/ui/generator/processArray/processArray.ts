import { type FhirMessagesIds } from '@minvws/mgo-mgo-intl';
import { isPrimitiveValueType, isValueType } from '../../../parse/types';
import { type GeneratorContext } from '../createGeneratorContext/createGeneratorContext';
import { type MgoType } from '../createUiElementHelper/createUiElementHelper';
import { processValue } from '../processValue/processValue';

function isArrayOfSameValueType(values: unknown[]): values is MgoType[] {
    if (!values.length) return false;
    const firstValue = values[0];
    if (!isValueType(firstValue) && !isPrimitiveValueType(firstValue)) {
        return false;
    }
    const type = firstValue._type;
    return values.every((value) => {
        if (!isValueType(value) || !isPrimitiveValueType(firstValue)) {
            return false;
        }
        return value._type === type;
    });
}

export function processArray(context: GeneratorContext, path: string, value: unknown[]) {
    const { createUiElement } = context;

    if (isArrayOfSameValueType(value)) {
        const result = createUiElement(path as FhirMessagesIds, value);
        return [result].flat();
    }

    return value.map((x) => processValue(context, path, x as object)).flat();
}
