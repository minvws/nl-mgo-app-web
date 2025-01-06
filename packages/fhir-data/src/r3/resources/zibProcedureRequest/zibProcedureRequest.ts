import { parse } from '../../../parse';
import { map } from '../../../utils';
import { uiSchema } from './uiSchema';
import { FhirVersion, type ResourceConfig } from '../../../types/Fhir';
import { type ProcedureRequest } from 'fhir/r3';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-ProcedureRequest'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317340
 */
function parseZibProcedureRequest(resource: ProcedureRequest) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        status: parse.string(resource.status),
        occurrence: parse.period(resource.occurrencePeriod),
        code: parse.codeableConcept(resource.code),
        intent: parse.string(resource.intent),
        subject: parse.reference(resource.subject),
        perfomer: parse.reference(resource.performer),
        reason: map(resource.reasonReference, parse.reference),
    };
}

export type ZibProcedureRequest = ReturnType<typeof parseZibProcedureRequest>;

export const zibProcedureRequest = {
    profile,
    parse: parseZibProcedureRequest,
    uiSchema,
} satisfies ResourceConfig<ProcedureRequest, ZibProcedureRequest>;
