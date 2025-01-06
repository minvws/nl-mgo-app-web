import { type Observation } from 'fhir/r3';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation';
import { uiSchema } from './uiSchema';
import { parse } from '../../../parse';
import { FhirVersion, type ResourceConfig } from '../../../types/Fhir';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-BodyHeight'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317149
 */
function parseZibBodyHeight(resource: Observation) {
    return {
        ...parseNlCoreObservationBase(resource),
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
    };
}

export type ZibBodyHeight = ReturnType<typeof parseZibBodyHeight>;

export const zibBodyHeight = {
    profile,
    parse: parseZibBodyHeight,
    uiSchema,
} satisfies ResourceConfig<Observation, ZibBodyHeight>;
