import { type Observation } from 'fhir/r3';
import { type I18nContext } from '../../../i18n';
import { FhirVersion } from '../../../types/Fhir';
import { type ResourceConfigR3 } from '../config';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation';
import { uiSchema } from './uiSchema';
import { parse } from '../../../parse';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-FunctionalOrMentalStatus'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317206
 */
function parseZibFunctionalOrMentalStatus(resource: Observation, i18nContext: I18nContext) {
    const { effectiveDateTime: _, ...rest } = parseNlCoreObservationBase(resource, i18nContext);

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
} satisfies ResourceConfigR3<Observation, ZibFunctionalOrMentalStatus>;
