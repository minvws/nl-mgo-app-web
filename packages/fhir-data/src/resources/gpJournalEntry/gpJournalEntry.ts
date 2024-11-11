import { type Observation } from '../../fhir/index';
import { parse } from '../../parse';
import { findComponentByCode, oneOfValueX } from '../../parse/helpers';
import { map } from '../../utils';
import { type ResourceConfig } from '../config';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/gp-JournalEntry';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2316995
 */
function parseGpJournalEntry(resource: Observation) {
    const ICPC_S = findComponentByCode(resource.component, 'ADMDX');
    const ICPC_E = findComponentByCode(resource.component, 'DISDX');

    return {
        ...parse.resourceMeta(resource, profile),
        identifier: map(resource.identifier, parse.identifier),
        status: parse.string(resource.status),
        code: parse.codeableConcept(resource.code),
        context: parse.reference(resource.context),
        ...oneOfValueX(resource, ['dateTime', 'period'], 'effective'),
        performer: map(resource.performer, parse.reference),
        valueString: parse.string(resource.valueString),
        ICPC_S: {
            valueCodeableConcept: parse.codeableConcept(ICPC_S?.valueCodeableConcept),
        },
        ICPC_E: {
            valueCodeableConcept: parse.codeableConcept(ICPC_E?.valueCodeableConcept),
        },
    };
}

export type GpJournalEntry = ReturnType<typeof parseGpJournalEntry>;

export const gpJournalEntry = {
    profile,
    parse: parseGpJournalEntry,
    uiSchema,
} satisfies ResourceConfig<Observation, GpJournalEntry>;
