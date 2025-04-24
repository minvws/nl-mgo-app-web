import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Observation } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types';
import { generateUiSchema } from '../../../ui/generator';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-LivingSituation'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317251
 */
const parseZibLivingSituation = (resource: Observation) => {
    const {
        comment,
        effectiveDateTime,
        effectivePeriod,
        identifier,
        performer,
        subject,
        valueCodeableConcept,
    } = parseNlCoreObservationBase(resource);

    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier,
        subject,
        effectiveDateTime,
        effectivePeriod,
        performer,

        // HCIM LivingSituation-v3.1(2017EN)
        valueCodeableConcept,
        comment,
    };
};

export type ZibLivingSituation = ReturnType<typeof parseZibLivingSituation>;

export const zibLivingSituation = {
    profile,
    parse: parseZibLivingSituation,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<Observation, ZibLivingSituation>;
