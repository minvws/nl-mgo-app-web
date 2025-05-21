import { type FhirMessagesIds } from '@minvws/mgo-mgo-intl';
import { isValueType, type MgoType, type ValueType } from '../../../parse/types';
import { hasExtensions } from '../../helpers/hasExtensions/hasExtensions';
import { type HealthUiGroup, type UiElement } from '../../types';
import { type GeneratorContext } from '../createGeneratorContext/createGeneratorContext';
import { processValue } from '../processValue/processValue';

function isArrayOfSameValueType(values: unknown[]): values is MgoType[] {
    if (!values.length) return false;
    const firstValue = values[0];
    if (!isValueType(firstValue)) {
        return false;
    }
    const type = firstValue._type;
    return values.every((value) => {
        if (!isValueType(value)) {
            return false;
        }
        return value._type === type;
    });
}

function arrayContainsExtensions(values: ValueType[]): boolean {
    return values.some((value) => hasExtensions(value));
}

export function processArray(
    context: GeneratorContext,
    path: string,
    value: unknown[]
): (UiElement | HealthUiGroup)[] {
    const { createUiElement } = context;

    if (isArrayOfSameValueType(value) && !arrayContainsExtensions(value)) {
        const result = createUiElement(path as FhirMessagesIds, value);
        return [result].flat();
    }

    const elements = value.map((x) => processValue(context, path, x as object)).flat();
    if (elements.length) {
        return elements;
    }

    return [
        {
            label: context.formatLabel(path as FhirMessagesIds, null),
            type: 'SINGLE_VALUE',
            display: undefined,
        },
    ];
}
