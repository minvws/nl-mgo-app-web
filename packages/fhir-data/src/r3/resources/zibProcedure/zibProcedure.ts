import { FhirVersion } from '@minvws/mgo-fhir-types';
import { isNonNullish } from '@minvws/mgo-mgo-utils';
import { type Procedure } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types';
import { map } from '../../../utils';
import { focalDevice } from './elements/focalDevice/focalDevice';
import { performer } from './elements/performer/performer';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-Procedure'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317337
 */
function parseZibProcedure(resource: Procedure) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        performedPeriod: parse.period(resource.performedPeriod),
        bodySite: map(resource.bodySite, parse.codeableConcept),
        bodySiteQualifier: resource.bodySite
            ?.map((x) => parse.extensionNictiz(x, 'BodySite-Qualifier'))
            .filter(isNonNullish),
        reasonReference: map(resource.reasonReference, parse.reference),
        code: parse.codeableConcept(resource.code),
        procedureMethod: parse.extension(
            resource,
            'http://hl7.org/fhir/StructureDefinition/procedure-method', // NOSONAR
            'codeableConcept'
        ),
        focalDevice: map(resource.focalDevice, focalDevice.parse),
        location: parse.reference(resource.location),
        performer: map(resource.performer, performer.parse),
        subject: parse.reference(resource.subject),
    };
}

export type ZibProcedure = ReturnType<typeof parseZibProcedure>;

export const zibProcedure = {
    profile,
    parse: parseZibProcedure,
    uiSchema,
} satisfies ResourceConfig<Procedure, ZibProcedure>;
