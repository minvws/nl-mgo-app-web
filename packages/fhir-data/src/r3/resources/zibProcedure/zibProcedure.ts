import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Procedure } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types';
import { generateUiSchema } from '../../../ui/generator';
import { map } from '../../../utils';
import { parseFocalDevice } from './elements/focalDevice/focalDevice';
import { parsePerformer } from './elements/performer/performer';

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

export const zibProcedure = {
    profile,
    parse: parseZibProcedure,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<Procedure, ZibProcedure>;
