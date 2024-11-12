import { type Observation } from 'fhir/r3';
import { FhirVersion } from '../../../types/Fhir';
import { type ResourceConfigR3 } from '../config';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation';
import { uiSchema } from './uiSchema';
import { parse } from '../../../parse';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-DrugUse'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317175
 */
function parseZibDrugUse(resource: Observation) {
    const { effectiveDateTime: _, ...rest } = parseNlCoreObservationBase(resource);
    return {
        ...rest,
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
    };
}

export type ZibDrugUse = ReturnType<typeof parseZibDrugUse>;

export const zibDrugUse = {
    profile,
    parse: parseZibDrugUse,
    uiSchema,
} satisfies ResourceConfigR3<Observation, ZibDrugUse>;
