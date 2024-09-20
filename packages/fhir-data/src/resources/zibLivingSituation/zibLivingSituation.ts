import { type Observation } from '../../fhir/index';
import { type ResourceConfig } from '../config';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-LivingSituation';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317251
 */
const parseZibLivingSituation = (resource: Observation) =>
    parseNlCoreObservationBase(resource, profile);

export type ZibLivingSituation = ReturnType<typeof parseZibLivingSituation>;

export const zibLivingSituation = {
    profile,
    parse: parseZibLivingSituation,
    uiSchema,
} satisfies ResourceConfig<Observation, ZibLivingSituation>;
