import { type Observation } from 'fhir/r3';
import { type I18nContext } from '../../../i18n';
import { FhirVersion } from '../../../types/Fhir';
import { type ResourceConfigR3 } from '../config';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation';
import { uiSchema } from './uiSchema';
import { parse } from '../../../parse';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-LivingSituation'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317251
 */
const parseZibLivingSituation = (resource: Observation, i18nContext: I18nContext) => {
    return {
        ...parseNlCoreObservationBase(resource, i18nContext),
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
    };
};

export type ZibLivingSituation = ReturnType<typeof parseZibLivingSituation>;

export const zibLivingSituation = {
    profile,
    parse: parseZibLivingSituation,
    uiSchema,
} satisfies ResourceConfigR3<Observation, ZibLivingSituation>;
