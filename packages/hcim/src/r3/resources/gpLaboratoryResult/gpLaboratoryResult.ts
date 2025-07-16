import { FhirVersion } from '@minvws/mgo-fhir';
import { parse } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { type Observation } from 'fhir/r3';
import { type ResourceConfig } from '../../../resourceTypes';
import { parseZibLaboratoryTestResultObservationBase } from '../zibLaboratoryTestResultObservation/zibLaboratoryTestResultObservation';
import { summary } from './summary';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/gp-LaboratoryResult'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2316997
 */
function parseGpLaboratoryResult(resource: Observation) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        ...parseZibLaboratoryTestResultObservationBase(resource),
    };
}

export type GpLaboratoryResult = ReturnType<typeof parseGpLaboratoryResult>;

export const gpLaboratoryResult: ResourceConfig<Observation, GpLaboratoryResult> = {
    profile,
    parse: parseGpLaboratoryResult,
    uiSchema: generateUiSchema,
    summary,
};
