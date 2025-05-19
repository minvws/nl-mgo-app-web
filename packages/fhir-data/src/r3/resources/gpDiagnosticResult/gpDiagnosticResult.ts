import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Observation } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types';
import { generateUiSchema } from '../../../ui/generator';
import { parseZibGeneralMeasurementBase } from '../zibGeneralMeasurement/zibGeneralMeasurement';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/gp-DiagnosticResult'; // NOSONAR

export type GpDiagnosticResult = ReturnType<typeof parseGpDiagnosticResult>;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2316990
 */
function parseGpDiagnosticResult(resource: Observation) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        ...parseZibGeneralMeasurementBase(resource),

        episodeOfCare: parse.extensionMultiple(
            resource,
            'http://nictiz.nl/fhir/StructureDefinition/extension-context-nl-core-episodeofcare', // NOSONAR
            'reference'
        ),
    };
}

export const gpDiagnosticResult = {
    profile,
    parse: parseGpDiagnosticResult,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<Observation, GpDiagnosticResult>;
