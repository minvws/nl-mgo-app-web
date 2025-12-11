import { type FhirMessagesIds } from '@minvws/mgo-intl';
import { isNullish } from '@minvws/mgo-utils';
import { snakeCase } from 'lodash-es';
import { type HealthUiGroup, type UiElement } from '../../types/index.js';
import { type GeneratorContext } from '../createGeneratorContext/createGeneratorContext.js';
import { getUiElements } from '../getUiElements/getUiElements.js';
import { processValue } from '../processValue/processValue.js';

export function processObject(context: GeneratorContext, path: string, value: object) {
    const elements: (UiElement | HealthUiGroup)[] = [];
    const entries = Object.entries(value);

    for (const [key, value] of entries) {
        // skip meta data properties such as _profile used in MGO elements
        if (key.startsWith('_')) {
            continue;
        }

        const valuePath = `${path}.${snakeCase(key)}`;
        if (isNullish(value)) {
            elements.push({
                label: context.formatLabel(valuePath as FhirMessagesIds, null),
                type: 'SINGLE_VALUE',
                value: undefined,
            });
        } else {
            elements.push(...processValue(context, valuePath, value));
        }
    }

    if (path !== context.rootPath && elements.length > 1) {
        return [
            {
                label: path,
                children: getUiElements(elements),
            } satisfies HealthUiGroup,
        ];
    }

    return elements;
}
