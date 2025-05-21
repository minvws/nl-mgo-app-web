import { type Coding, type ObservationComponent } from '@minvws/mgo-fhir-types';
import { type Nullable } from '@minvws/mgo-mgo-utils';
import { upperFirst } from 'lodash';
import { type SetRequired, type UnionToIntersection } from 'type-fest';
import { valueX, type ParserKey, type ReturnTypeParser } from '../valueX/valueX';

type ObservationComponentTypeR3 =
    | 'quantity'
    | 'codeableConcept'
    | 'string'
    | 'range'
    | 'ratio'
    | 'sampledData'
    | 'attachment'
    | 'time'
    | 'dateTime'
    | 'period';

type ObservationComponentTypeR4 =
    | 'quantity'
    | 'codeableConcept'
    | 'string'
    | 'boolean'
    | 'integer'
    | 'range'
    | 'ratio'
    | 'sampledData'
    | 'time'
    | 'dateTime'
    | 'period';

export type ObservationComponentParseMap = {
    [key: string]: {
        coding: SetRequired<Coding, 'system' | 'code'>;
        type: Extract<ParserKey, ObservationComponentTypeR3 | ObservationComponentTypeR4>;
    };
};

type ObservationComponentsResult<T extends ObservationComponentParseMap> = {
    [K in keyof T]?: {
        [P in `value${Capitalize<T[K]['type']>}`]: ReturnTypeParser<T[K]['type']>;
    }[];
};

/**
 * Returns all components that have a matching coding.
 */
function getObservationComponents(
    components: ObservationComponent[],
    coding: SetRequired<Coding, 'system' | 'code'>
): ObservationComponent[] | undefined {
    return components?.filter((comp) => {
        const index =
            comp.code.coding?.findIndex(
                ({ system, code }) => system === coding.system && code === coding.code
            ) ?? -1;
        return index !== -1;
    });
}

/**
 * Parses the components based on the map provided.
 * @example
 * ```ts
 * const observation = {
 *     component: [
 *         {
 *             "code": {
 *                 "coding": [
 *                     {
 *                         "system": "http://loinc.org",
 *                         "code": "8480-6",
 *                         "display": "Systolic blood pressure"
 *                     }
 *                 ]
 *             },
 *             "valueQuantity": {
 *                 "value": 108,
 *                 "unit": "mmHg",
 *                 "system": "http://unitsofmeasure.org",
 *                 "code": "mm[Hg]"
 *             }
 *         }
 *     ]
 * };
 *
 * const result = parseObservationComponents(observation.components, {
 *     systolicBP: {
 *         coding: { system: 'http://loinc.org', code: '8480-6' },
 *         type: 'quantity',
 *     },
 * });
 *
 * // result = {
 * //     systolicBP: [
 * //        {
 * //            valueQuantity: {
 * //                _type: "quantity",
 * //                value: 108,
 * //                comparator: null,
 * //                unit: "mmHg",
 * //                system: "http://unitsofmeasure.org",
 * //                code: "mm[Hg]"
 * //            }
 * //        }
 * //     ]
 * // };
 * ```
 */
export function parseObservationComponents<T extends ObservationComponentParseMap>(
    components: Nullable<ObservationComponent[]>,
    componentsMap: T
): ObservationComponentsResult<T> | undefined {
    if (!components?.length) {
        return;
    }
    const result: ObservationComponentsResult<T> = {};
    const entries = Object.entries(componentsMap);

    for (const [key, value] of entries) {
        const matchingComponents = getObservationComponents(
            components,
            value.coding
        ) as UnionToIntersection<ObservationComponent>[];

        const results = matchingComponents.map((comp) => ({
            [`value${upperFirst(value.type)}`]: valueX(comp, value.type),
        }));

        if (results.length) {
            (result as any)[key] = results; // eslint-disable-line @typescript-eslint/no-explicit-any
        }
    }

    return result;
}
