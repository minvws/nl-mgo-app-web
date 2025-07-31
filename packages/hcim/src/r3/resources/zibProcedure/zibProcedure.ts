import { FhirVersion } from '@minvws/mgo-fhir';
import { type Procedure } from '@minvws/mgo-fhir/r3';
import { parse } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { map } from '@minvws/mgo-utils';
import { type ResourceConfig } from '../../../resourceTypes.js';
import { parseFocalDevice, type FocalDevice } from './elements/focalDevice/focalDevice.js';
import { parsePerformer, type Performer } from './elements/performer/performer.js';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-Procedure'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317337
 */
function parseZibProcedure(resource: Procedure) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier: map(resource.identifier, parse.identifier),
        subject: parse.reference(resource.subject),
        performedPeriod: parse.period(resource.performedPeriod),

        // HCIM TextResult-v4.1(2017EN)
        report: map(resource.report, parse.reference),

        // HCIM Procedure-v4.1(2017EN) && HCIM HealthProfessional-v3.2(2017EN)
        procedureMethod: parse.extension(
            resource,
            'http://hl7.org/fhir/StructureDefinition/procedure-method', // NOSONAR
            'codeableConcept'
        ),
        basedOn: map(resource.basedOn, parse.reference),
        code: parse.codeableConcept(resource.code),
        performer: map(resource.performer, parsePerformer),
        location: parse.reference(resource.location),
        reasonReference: map(resource.reasonReference, parse.reference),
        bodySite: map(resource.bodySite, (bodySite) => ({
            ...parse.codeableConcept,
            procedureLaterality: parse.extension(
                bodySite,
                'http://nictiz.nl/fhir/StructureDefinition/BodySite-Qualifier', // NOSONAR
                'codeableConcept'
            ),
        })),
        focalDevice: map(resource.focalDevice, parseFocalDevice),
    };
}

export type ZibProcedure = ReturnType<typeof parseZibProcedure>;

export { type FocalDevice, type Performer };

export const zibProcedure = {
    profile,
    parse: parseZibProcedure,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<FhirVersion.R3, Procedure, ZibProcedure>;
