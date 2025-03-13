import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Flag } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types/Fhir';
import { map } from '../../../utils';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-Alert'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317136
 */
function parseZibAlert(resource: Flag) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        identifier: map(resource.identifier, parse.identifier),
        status: parse.code(resource.status),
        category: parse.codeableConcept(resource.category),
        code: parse.codeableConcept(resource.code),
        subject: parse.reference(resource.subject),
        period: parse.period(resource.period),
        encounter: parse.reference(resource.encounter),
        author: parse.reference(resource.author),
        concernReference: parse.extension(
            resource,
            'http://hl7.org/fhir/StructureDefinition/flag-detail', // NOSONAR
            'reference'
        ),
    };
}

export type ZibAlert = ReturnType<typeof parseZibAlert>;

export const zibAlert = {
    profile,
    parse: parseZibAlert,
    uiSchema,
} satisfies ResourceConfig<Flag, ZibAlert>;
