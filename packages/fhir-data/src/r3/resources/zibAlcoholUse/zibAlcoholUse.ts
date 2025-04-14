import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Observation } from 'fhir/r3';
import { type ResourceConfig } from '../../../types';

import { parse } from '../../../parse';
import { map } from '../../../utils/map/map';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-AlcoholUse'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317134
 */
function parseZibAlcoholUse(resource: Observation) {
    const { effectiveDateTime: _, ...rest } = parseNlCoreObservationBase(resource);
    return {
        ...rest,
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        component: { amount: parse.quantity(resource.component?.[0]?.valueQuantity) },
        performer: map(resource.performer, parse.reference),
    };
}

export type ZibAlcoholUse = ReturnType<typeof parseZibAlcoholUse>;

export const zibAlcoholUse = {
    profile,
    parse: parseZibAlcoholUse,
    uiSchema,
} satisfies ResourceConfig<Observation, ZibAlcoholUse>;
