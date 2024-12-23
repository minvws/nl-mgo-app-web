import { type Observation } from 'fhir/r3';
import { type I18nContext } from '../../../i18n';
import { parse } from '../../../parse';
import { FhirVersion } from '../../../types/Fhir';
import { type ResourceConfigR3 } from '../config';
import { parseZibLaboratoryTestResultObservationBase } from '../zibLaboratoryTestResultObservation/zibLaboratoryTestResultObservation';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/gp-LaboratoryResult'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2316997
 */
function parseGpLaboratoryResult(resource: Observation, i18nContext: I18nContext) {
    const { ...rest } = parseZibLaboratoryTestResultObservationBase(resource, i18nContext);

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
} satisfies ResourceConfigR3<Observation, GpLaboratoryResult>;
