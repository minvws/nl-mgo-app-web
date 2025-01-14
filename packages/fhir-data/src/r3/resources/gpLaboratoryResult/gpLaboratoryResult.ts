import { type Observation } from 'fhir/r3';
import { parse } from '../../../parse';
import { FhirVersion, type ResourceConfig } from '../../../types/Fhir';
import { parseZibLaboratoryTestResultObservationBase } from '../zibLaboratoryTestResultObservation/zibLaboratoryTestResultObservation';
import { uiSchema } from './uiSchema';
import { summary } from './summary';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/gp-LaboratoryResult'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2316997
 */
function parseGpLaboratoryResult(resource: Observation) {
    const { ...rest } = parseZibLaboratoryTestResultObservationBase(resource);

    return {
        ...rest,
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
    };
}

export type GpLaboratoryResult = ReturnType<typeof parseGpLaboratoryResult>;

export const gpLaboratoryResult = {
    profile,
    parse: parseGpLaboratoryResult,
    uiSchema,
    summary,
} satisfies ResourceConfig<Observation, GpLaboratoryResult>;
