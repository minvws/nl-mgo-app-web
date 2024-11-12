import { type Coverage } from 'fhir/r3';
import { FhirVersion } from '../../../types/Fhir';
import { map } from '../../../utils';
import { type ResourceConfigR3 } from '../config';
import { grouping } from './elements/grouping/grouping';
import { uiSchema } from './uiSchema';
import { parse } from '../../../parse';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-Payer'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317307
 */
function parseZibPayer(resource: Coverage) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        identifier: map(resource.identifier, parse.identifier),
        status: parse.code(resource.status),
        type: parse.codeableConcept(resource.type),
        policyHolder: parse.reference(resource.policyHolder),
        subscriber: parse.reference(resource.subscriber),
        subscriberId: parse.string(resource.subscriberId),
        beneficiary: parse.reference(resource.beneficiary),
        relationship: parse.codeableConcept(resource.relationship),
        period: parse.period(resource.period),
        payor: map(resource.payor, parse.reference),
        grouping: grouping.parse(resource.grouping),
        dependent: parse.string(resource.dependent),
        sequence: parse.string(resource.sequence),
        order: parse.positiveInt(resource.order),
        network: parse.string(resource.network),
        contract: map(resource.contract, parse.reference),
    };
}

export type ZibPayer = ReturnType<typeof parseZibPayer>;

export const zibPayer = {
    profile,
    parse: parseZibPayer,
    uiSchema,
} satisfies ResourceConfigR3<Coverage, ZibPayer>;
