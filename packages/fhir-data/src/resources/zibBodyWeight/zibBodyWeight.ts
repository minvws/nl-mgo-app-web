import { type Observation } from '../../fhir/index';
import { type ResourceConfig } from '../config';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation';
import { uiSchema } from './uiSchema';
import { parse } from '../../parse';
import { componentSlice } from '../../parse/helpers';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-BodyWeight';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317153
 */
function parseZibBodyWeight(resource: Observation) {
    const clothing = componentSlice(resource.component, '8352-7');

    return {
        ...parseNlCoreObservationBase(resource, profile),
        clothing: {
            valueCodeableConcept: parse.codeableConcept(clothing?.valueCodeableConcept),
        },
    };
}

export type ZibBodyWeight = ReturnType<typeof parseZibBodyWeight>;

export const zibBodyWeight = {
    profile,
    parse: parseZibBodyWeight,
    uiSchema,
} satisfies ResourceConfig<Observation, ZibBodyWeight>;
