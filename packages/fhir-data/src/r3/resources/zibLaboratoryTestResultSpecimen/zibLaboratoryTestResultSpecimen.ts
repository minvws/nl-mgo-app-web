import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Specimen } from 'fhir/r3';
import { parse } from '../../../parse';
import { oneOfValueX } from '../../../parse/helpers';
import { type ResourceConfig } from '../../../types';
import { generateUiSchema } from '../../../ui/generator';
import { map } from '../../../utils';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-LaboratoryTestResult-Specimen'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317241
 */
function parseZibLaboratoryTestResultSpecimen(resource: Specimen) {
    const collection = resource.collection;

    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM LaboratoryTestResult-v4.1(2017EN)
        identifier: map(resource.identifier, parse.identifier),
        type: parse.codeableConcept(resource.type),
        subject: parse.reference(resource.subject),
        receivedTime: parse.dateTime(resource.receivedTime),
        parent: map(resource.parent, parse.reference),
        collection: {
            ...oneOfValueX(collection, ['dateTime', 'period'], 'collected'),
            quantity: parse.simpleQuantity(collection?.quantity),
            method: parse.codeableConcept(collection?.method),
            bodySite: {
                ...parse.codeableConcept(collection?.bodySite),
                laterality: parse.extensionMultiple(
                    collection?.bodySite,
                    'http://nictiz.nl/fhir/StructureDefinition/BodySite-Qualifier', // NOSONAR
                    'codeableConcept'
                ),
                morphology: parse.extensionMultiple(
                    collection?.bodySite,
                    'http://nictiz.nl/fhir/StructureDefinition/Morphology', // NOSONAR
                    'codeableConcept'
                ),
            },
        },
        container: map(resource.container, (container) => ({
            identifier: map(container?.identifier, parse.identifier),
            type: parse.codeableConcept(container?.type),
        })),
        note: map(resource.note, parse.annotation),
    };
}

export type ZibLaboratoryTestResultSpecimen = ReturnType<
    typeof parseZibLaboratoryTestResultSpecimen
>;

export const zibLaboratoryTestResultSpecimen = {
    profile,
    parse: parseZibLaboratoryTestResultSpecimen,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<Specimen, ZibLaboratoryTestResultSpecimen>;
