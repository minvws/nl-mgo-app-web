import { type Observation } from '../../fhir/index';
import { parse } from '../../parse';
import { oneOfValueX } from '../../parse/helpers';
import { map } from '../../utils';
import { type ResourceConfig } from '../config';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/gp-DiagnosticResult';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2316990
 */
function parseGpDiagnosticResult(resource: Observation) {
    return {
        ...parse.resourceMeta(resource, profile),
        identifier: map(resource.identifier, parse.identifier),
        context: parse.reference(resource.context),
        subject: parse.reference(resource.subject),
        effective: parse.dateTime(resource.effectiveDateTime),
        performer: map(resource.performer, parse.reference),
        status: parse.string(resource.status),
        code: parse.codeableConcept(resource.code),
        ...oneOfValueX(resource, [
            'quantity',
            'codeableConcept',
            'string',
            'boolean',
            'range',
            'dateTime',
            'period',
        ]),
        comment: parse.string(resource.comment),
        method: parse.codeableConcept(resource.method),
    };
}

export type GpDiagnosticResult = ReturnType<typeof parseGpDiagnosticResult>;

export const gpDiagnosticResult = {
    profile,
    parse: parseGpDiagnosticResult,
    uiSchema,
} satisfies ResourceConfig<Observation, GpDiagnosticResult>;
