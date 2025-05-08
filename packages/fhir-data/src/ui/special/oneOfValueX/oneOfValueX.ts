import { type FhirMessagesIds } from '@minvws/mgo-mgo-intl';
import { isNonNullish, isNullish, type Nullable } from '@minvws/mgo-mgo-utils';
import { upperFirst } from 'lodash';
import { type UiHelperContext } from '../../context';
import { isUiSchemaGroup } from '../../helpers/isUiSchemaGroup/isUiSchemaGroup';
import { getTypes } from '../../type';
import { type HealthUiGroup, type UiElement } from '../../types';

export const oneOfValueX =
    (context: UiHelperContext) =>
    <T extends object>(label: FhirMessagesIds, value: Nullable<T>, prefix: string = 'value') => {
        if (isNullish(value)) {
            return [] as UiElement[];
        }

        const typeUiFunctions = getTypes(context);
        let type: keyof typeof typeUiFunctions;

        for (type in typeUiFunctions) {
            const key = `${prefix}${upperFirst(type)}` as keyof T;
            if (key in value && isNonNullish(value[key])) {
                const uiValue = typeUiFunctions[type](label, value[key] as any); // eslint-disable-line @typescript-eslint/no-explicit-any
                const elements = Array.isArray(uiValue)
                    ? uiValue
                    : ([uiValue] as (UiElement | HealthUiGroup)[]);
                return elements.map((x) => (isUiSchemaGroup(x) ? x.children : x)).flat();
            }
        }

        return [] as UiElement[];
    };
