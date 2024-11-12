import { type Observation } from 'fhir/r3';
import { parse } from '../../../parse';
import { oneOfValueX } from '../../../parse/helpers';
import { FhirVersion } from '../../../types/Fhir';
import { map } from '../../../utils';
import { type ResourceConfigR3 } from '../config';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/gp-DiagnosticResult'; // NOSONAR

export type GpDiagnosticResult = ReturnType<typeof parseGpDiagnosticResult>;

function parseGpDiagnosticResult(resource: Observation) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
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

export const gpDiagnosticResult = {
    profile,
    parse: parseGpDiagnosticResult,
    uiSchema,
} satisfies ResourceConfigR3<Observation, GpDiagnosticResult>;
