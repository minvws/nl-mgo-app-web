import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Observation } from 'fhir/r3';
import { type ResourceConfig } from '../../../types';

import { parse } from '../../../parse';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-LivingSituation'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317251
 */
const parseZibLivingSituation = (resource: Observation) => {
    return {
        ...parseNlCoreObservationBase(resource),
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
    };
};

export type ZibLivingSituation = ReturnType<typeof parseZibLivingSituation>;

export const zibLivingSituation = {
    profile,
    parse: parseZibLivingSituation,
    uiSchema,
} satisfies ResourceConfig<Observation, ZibLivingSituation>;
