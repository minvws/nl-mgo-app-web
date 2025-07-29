import { FhirVersion } from '@minvws/mgo-fhir';
import { type DeviceUseStatement } from '@minvws/mgo-fhir/r3';
import { parse } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { map } from '@minvws/mgo-utils';
import { type ResourceConfig } from '../../../resourceTypes.js';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-MedicalDevice'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317253
 */
function parseZibMedicalDevice(resource: DeviceUseStatement) {
    const indicationProblem = map(resource.indication, (indication) => {
        return parse.extension(
            indication,
            'http://nictiz.nl/fhir/StructureDefinition/zib-MedicalDevice-Problem', // NOSONAR
            'reference'
        );
    });

    const bodySite = {
        laterality: parse.extension(
            resource,
            'http://nictiz.nl/fhir/StructureDefinition/BodySite-Qualifier', // NOSONAR
            'codeableConcept'
        ),
        coding: map(resource.bodySite?.coding, (x) => parse.coding(x)),
        text: parse.string(resource.bodySite?.text),
    };

    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier: map(resource.identifier, parse.identifier),
        subject: parse.reference(resource.subject),
        whenUsed: parse.period(resource.whenUsed),
        source: parse.reference(resource.source),

        // HCIM MedicalDevice-v3.1(2017EN)
        healthCareProvider: parse.extension(
            resource,
            'http://nictiz.nl/fhir/StructureDefinition/zib-MedicalDevice-Organization', //NOSONAR
            'reference'
        ),
        healthProfessional: parse.extension(
            resource,
            'http://nictiz.nl/fhir/StructureDefinition/zib-MedicalDevice-Practitioner', //NOSONAR
            'reference'
        ),
        device: parse.reference(resource.device),
        indicationProblem: indicationProblem,
        bodySite: bodySite,
        note: map(resource.note, parse.annotation),
    };
}

export type ZibMedicalDevice = ReturnType<typeof parseZibMedicalDevice>;

export const zibMedicalDevice = {
    profile,
    parse: parseZibMedicalDevice,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<FhirVersion.R3, DeviceUseStatement, ZibMedicalDevice>;
