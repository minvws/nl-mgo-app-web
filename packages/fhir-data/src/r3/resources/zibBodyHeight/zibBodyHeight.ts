import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Observation } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types/Fhir';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation';
import { uiSchema } from './uiSchema';

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
