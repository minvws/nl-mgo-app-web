import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Consent } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types/Fhir';
import { map } from '../../../utils';
import { actor } from './elements/actor/actor';
import { data } from './elements/data/data';
import { except } from './elements/except/except';
import { policy } from './elements/policy/policy';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-TreatmentDirective'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317378
 */
function parseZibTreatmentDirective(resource: Consent) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        identifier: parse.identifier(resource.identifier),
        status: parse.code(resource.status),
        category: map(resource.category, parse.codeableConcept),
        patient: parse.reference(resource.patient),
        period: parse.period(resource.period),
        dateTime: parse.dateTime(resource.dateTime),
        consentingParty: map(resource.consentingParty, parse.reference),
        actor: map(resource.actor, actor.parse),
        action: map(resource.action, parse.codeableConcept),
        organization: map(resource.organization, parse.reference),
        sourceAttachment: parse.attachment(resource.sourceAttachment),
        sourceIdentifier: parse.identifier(resource.sourceIdentifier),
        sourceReference: parse.reference(resource.sourceReference),
        policy: map(resource.policy, policy.parse),
        policyRule: parse.string(resource.policyRule),
        securityLabel: map(resource.securityLabel, parse.coding),
        purpose: map(resource.purpose, parse.coding),
        dataPeriod: parse.period(resource.dataPeriod),
        data: map(resource.data, data.parse),
        except: map(resource.except, except.parse),
    };
}

export type ZibTreatmentDirective = ReturnType<typeof parseZibTreatmentDirective>;

export const zibTreatmentDirective = {
    profile,
    parse: parseZibTreatmentDirective,
    uiSchema,
} satisfies ResourceConfig<Consent, ZibTreatmentDirective>;
