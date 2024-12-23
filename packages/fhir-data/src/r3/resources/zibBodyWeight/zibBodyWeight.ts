import { type Observation } from 'fhir/r3';
import { type I18nContext } from '../../../i18n';
import { parse } from '../../../parse';
import { findComponentByCode } from '../../../parse/helpers';
import { type ResourceConfigR3 } from '../config';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation';
import { uiSchema } from './uiSchema';
import { FhirVersion } from '../../../types/Fhir';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-BodyWeight'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317153
 */
function parseZibBodyWeight(resource: Observation, i18nContext: I18nContext) {
    const clothing = findComponentByCode(resource.component, '8352-7');

    return {
        ...parseNlCoreObservationBase(resource, i18nContext),
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        clothing: {
            valueCodeableConcept: parse.codeableConcept(clothing?.valueCodeableConcept),
        },
    };
}

export type ZibBodyWeight = ReturnType<typeof parseZibBodyWeight>;

export const zibBodyWeight = {
    profile,
    parse: parseZibBodyWeight,
    uiSchema,
} satisfies ResourceConfigR3<Observation, ZibBodyWeight>;
