import { type Specimen } from 'fhir/r3';
import { FhirVersion } from '../../../types/Fhir';
import { parse } from '../../../parse';
import { type ResourceConfigR3 } from '../config';
import { uiSchema } from './uiSchema';
import { map } from '../../../utils';
import { container } from './elements/container/container';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-LaboratoryTestResult-Specimen'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317241
 */
function parseZibLaboratoryTestResultSpecimen(resource: Specimen) {
    const collection = resource.collection;

    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        identifier: map(resource.identifier, parse.identifier),
        subject: parse.reference(resource.subject),
        container: map(resource.container, container.parse),
        type: parse.codeableConcept(resource.type),
        substance: parse.string(null),
        receivedTime: parse.dateTime(resource.receivedTime),
        collection: {
            quantity: parse.quantity(collection?.quantity),
            collected:
                parse.dateTime(collection?.collectedDateTime) ??
                parse.period(collection?.collectedPeriod),
            method: parse.codeableConcept(collection?.method),
            bodySite: {
                value: parse.codeableConcept(collection?.bodySite),
                laterality: parse.extensionNictiz(collection?.bodySite, 'BodySite-Qualifier'),
                morphology: parse.extensionNictiz(collection?.bodySite, 'BodySite-Morphology'),
            },
        },
        note: map(resource.note, parse.annotation),
    };
}

export type ZibLaboratoryTestResultSpecimen = ReturnType<
    typeof parseZibLaboratoryTestResultSpecimen
>;

export const zibLaboratoryTestResultSpecimen = {
    profile,
    parse: parseZibLaboratoryTestResultSpecimen,
    uiSchema,
} satisfies ResourceConfigR3<Specimen, ZibLaboratoryTestResultSpecimen>;
