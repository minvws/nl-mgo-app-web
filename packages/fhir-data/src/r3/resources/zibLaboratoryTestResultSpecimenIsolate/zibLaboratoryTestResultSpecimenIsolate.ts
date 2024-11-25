import { type Specimen } from 'fhir/r3';
import { FhirVersion } from '../../../types/Fhir';
import { parse } from '../../../parse';
import { type ResourceConfigR3 } from '../config';
import { uiSchema } from './uiSchema';
import { map } from '../../../utils';
import { container } from './elements/container/container';
import { oneOfValueX } from '../../../parse/helpers';

const profile =
    'http://nictiz.nl/fhir/StructureDefinition/zib-LaboratoryTestResult-Specimen-Isolate'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317243
 */
function parseZibLaboratoryTestResultSpecimenIsolate(resource: Specimen) {
    const collection = resource.collection;

    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        identifier: map(resource.identifier, parse.identifier), // NL-CM:13.1.15
        subject: parse.reference(resource.subject), // NL-CM:13.1.29
        container: map(resource.container, container.parse), // NL-CM:13.1.20 & NL-CM:13.1.21
        type: parse.codeableConcept(resource.type), // NL-CM:13.1.22
        receivedTime: parse.dateTime(resource.receivedTime), // NL-CM:13.1.25
        collection: {
            quantity: parse.quantity(collection?.quantity), // NL-CM:13.1.23
            ...oneOfValueX(collection, ['dateTime', 'period'], 'collected'), // dateTime NL-CM:13.1.17, period NL-CM:13.1.24
            method: parse.codeableConcept(collection?.method), // NL-CM:13.1.18
            bodySite: {
                value: parse.codeableConcept(collection?.bodySite), // NL-CM:13.1.26
                laterality: parse.extensionNictiz(collection?.bodySite, 'BodySite-Qualifier'), // NL-CM:13.1.27
                morphology: parse.extensionNictiz(collection?.bodySite, 'BodySite-Morphology'), // NL-CM:13.1.28
            },
        },
        note: map(resource.note, parse.annotation), // NL-CM:13.1.19
    };
}

export type ZibLaboratoryTestResultSpecimenIsolate = ReturnType<
    typeof parseZibLaboratoryTestResultSpecimenIsolate
>;

export const zibLaboratoryTestResultSpecimenIsolate = {
    profile,
    parse: parseZibLaboratoryTestResultSpecimenIsolate,
    uiSchema,
} satisfies ResourceConfigR3<Specimen, ZibLaboratoryTestResultSpecimenIsolate>;
