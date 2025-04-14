import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type EpisodeOfCare } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types';
import { map } from '../../../utils';
import { diagnosis } from './elements/diagnosis/diagnosis';
import { statusHistory } from './elements/statusHistory/statusHistory';
import { uiSchema } from './uiSchema';

const profile = 'http://fhir.nl/fhir/StructureDefinition/nl-core-episodeofcare'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317023
 */
function parseNlCoreEpisodeofcare(resource: EpisodeOfCare) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        identifier: map(resource.identifier, parse.identifier),
        title: parse.extensionNictiz(resource, 'EpisodeOfCare-Title'),
        status: parse.code(resource.status),
        statusHistory: map(resource.statusHistory, statusHistory.parse),
        type: map(resource.type, parse.codeableConcept),
        diagnosis: map(resource.diagnosis, diagnosis.parse),
        patient: parse.reference(resource.patient),
        managingOrganization: parse.reference(resource.managingOrganization),
        period: parse.period(resource.period),
        referralRequest: map(resource.referralRequest, parse.reference),
        careManager: parse.reference(resource.careManager),
        team: map(resource.team, parse.reference),
        account: map(resource.account, parse.reference),
        dateFirstEncounter: parse.extensionNictiz(resource, 'EpisodeOfCare-DateFirstEncounter'),
        dateLastEncounter: parse.extensionNictiz(resource, 'EpisodeOfCare-DateLastEncounter'),
    };
}

export type NlCoreEpisodeofcare = ReturnType<typeof parseNlCoreEpisodeofcare>;

export const nlCoreEpisodeofcare = {
    profile,
    parse: parseNlCoreEpisodeofcare,
    uiSchema,
} satisfies ResourceConfig<EpisodeOfCare, NlCoreEpisodeofcare>;
