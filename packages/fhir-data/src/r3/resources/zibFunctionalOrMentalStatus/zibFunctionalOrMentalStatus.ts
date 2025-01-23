import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Observation } from 'fhir/r3';
import { type ResourceConfig } from '../../../types/Fhir';

import { parse } from '../../../parse';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-FunctionalOrMentalStatus'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317206
 */
function parseZibFunctionalOrMentalStatus(resource: Observation) {
    const { effectiveDateTime: _, ...rest } = parseNlCoreObservationBase(resource);

    return {
        ...rest,
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
    };
}

export type ZibFunctionalOrMentalStatus = ReturnType<typeof parseZibFunctionalOrMentalStatus>;

export const zibFunctionalOrMentalStatus = {
    profile,
    parse: parseZibFunctionalOrMentalStatus,
    uiSchema,
} satisfies ResourceConfig<Observation, ZibFunctionalOrMentalStatus>;
