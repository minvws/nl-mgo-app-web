import { type FhirVersion } from '@minvws/mgo-fhir-types/fhirVersion';
import { type FhirMessagesIds } from '@minvws/mgo-mgo-intl';
import { isPrimitiveValueType, isValueType } from '../../parse/types';
import { type HealthUiSchemaContext } from '../context';
import { type HealthUiGroup } from '../types';
import { processValue } from './processValue';
import { type MgoValueType, type UiElementGeneratorHelpers } from './uiHelpers';

function isArrayOfSameValueType(values: unknown[]): values is MgoValueType[] {
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

export function processArray(
    context: HealthUiSchemaContext,
    helpers: UiElementGeneratorHelpers,
    fhirVersion: `${FhirVersion}`,
    path: string,
    value: unknown[],
    group: HealthUiGroup | null = null
) {
    const { handleMultipleUiTypes } = helpers;
    if (isArrayOfSameValueType(value)) {
        const result = handleMultipleUiTypes(path as FhirMessagesIds, value);
        return [result].flat();
    }

    return value
        .map((x) => processValue(context, helpers, fhirVersion, path, x as object, group))
        .flat();
}
