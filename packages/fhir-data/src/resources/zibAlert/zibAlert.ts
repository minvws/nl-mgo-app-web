import { type Flag } from '../../fhir';
import { parse } from '../../parse';
import { map } from '../../utils';
import { type ResourceConfig } from '../config';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-Alert';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317136
 */
function parseZibAlert(resource: Flag) {
    return {
        ...parse.resourceMeta(resource, profile),
        identifier: map(resource.identifier, parse.identifier),
        status: parse.code(resource.status),
        category: parse.codeableConcept(resource.category),
        code: parse.codeableConcept(resource.code),
        subject: parse.reference(resource.subject),
        period: parse.period(resource.period),
        encounter: parse.reference(resource.encounter),
        author: parse.reference(resource.author),
    };
}

export type ZibAlert = ReturnType<typeof parseZibAlert>;

export const zibAlert = {
    profile,
    parse: parseZibAlert,
    uiSchema,
} satisfies ResourceConfig<Flag, ZibAlert>;
