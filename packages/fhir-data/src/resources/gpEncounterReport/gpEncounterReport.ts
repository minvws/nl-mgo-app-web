import { type Composition } from '../../fhir/index';
import { parse } from '../../parse';
import { map } from '../../utils';
import { type ResourceConfig } from '../config';
import { parseSection } from './elements/section/section';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/gp-EncounterReport';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2316993
 */
function parseGpEncounterReport(resource: Composition) {
    return {
        ...parse.resourceMeta(resource, profile),
        identifier: parse.identifier(resource.identifier),
        status: parse.string(resource.status),
        type: map(resource.type.coding, parse.coding),
        encounter: parse.reference(resource.encounter),
        date: parse.dateTime(resource.date),
        author: map(resource.author, parse.reference),
        title: parse.string(resource.title),
        section: map(resource.section, parseSection),
    };
}

export type GpEncounterReport = ReturnType<typeof parseGpEncounterReport>;

export const gpEncounterReport = {
    profile,
    parse: parseGpEncounterReport,
    uiSchema,
} satisfies ResourceConfig<Composition, GpEncounterReport>;
