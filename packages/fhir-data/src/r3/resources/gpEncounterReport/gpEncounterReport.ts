import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Composition } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types';
import { generateUiSchema } from '../../../ui/generator';
import { map } from '../../../utils';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/gp-EncounterReport'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2316993
 * There are no mapping available for this resource, so all values are mapped that exist in the test data set.
 */
function parseGpEncounterReport(resource: Composition) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        identifier: parse.identifier(resource.identifier),
        status: parse.string(resource.status),
        type: map(resource.type.coding, parse.coding),
        encounter: parse.reference(resource.encounter),
        date: parse.dateTime(resource.date),
        author: map(resource.author, parse.reference),
        title: parse.string(resource.title),
        section: map(resource.section, (section) => ({
            code: parse.codeableConcept(section?.code),
            entry: map(section?.entry, parse.reference),
        })),
    };
}

export type GpEncounterReport = ReturnType<typeof parseGpEncounterReport>;

export const gpEncounterReport = {
    profile,
    parse: parseGpEncounterReport,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<Composition, GpEncounterReport>;
