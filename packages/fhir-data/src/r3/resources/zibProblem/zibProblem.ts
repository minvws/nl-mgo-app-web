import { type Condition } from 'fhir/r3';
import { FhirVersion, type ResourceConfig } from '../../../types/Fhir';
import { parse } from '../../../parse';
import { map } from '../../../utils';
import { evidence } from './elements/evidence/evidence';
import { stage } from './elements/stage/stage';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-Problem'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317327
 */
function parseZibProblem(resource: Condition) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        identifier: map(resource.identifier, parse.identifier),
        clinicalStatus: parse.code(resource.clinicalStatus),
        verificationStatus: parse.code(resource.verificationStatus),
        category: map(resource.category, parse.codeableConcept),
        severity: parse.codeableConcept(resource.severity),
        code: parse.codeableConcept(resource.code),
        bodySite: map(resource.bodySite, parse.codeableConcept),
        subject: parse.reference(resource.subject),
        context: parse.reference(resource.context),
        onsetDateTime: parse.dateTime(resource.onsetDateTime),
        abatementDateTime: parse.dateTime(resource.abatementDateTime),
        assertedDate: parse.dateTime(resource.assertedDate),
        asserter: parse.reference(resource.asserter),
        stage: stage.parse(resource.stage),
        evidence: map(resource.evidence, evidence.parse),
        note: map(resource.note, parse.annotation),
    };
}

export type ZibProblem = ReturnType<typeof parseZibProblem>;

export const zibProblem = {
    profile,
    parse: parseZibProblem,
    uiSchema,
} satisfies ResourceConfig<Condition, ZibProblem>;
