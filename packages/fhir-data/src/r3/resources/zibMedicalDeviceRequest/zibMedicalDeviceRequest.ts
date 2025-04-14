import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type DeviceRequest } from 'fhir/r3';
import { parse } from '../../../parse';
import { oneOfValueX } from '../../../parse/helpers';
import { type ResourceConfig } from '../../../types';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-MedicalDeviceRequest'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317263
 */
function parseZibMedicalDeviceRequest(resource: DeviceRequest) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        status: parse.string(resource.status),
        occurrence: parse.period(resource.occurrencePeriod),
        ...oneOfValueX(resource, ['reference', 'codeableConcept'], 'code'),
        intent: parse.codeableConcept(resource.intent),
        subject: parse.reference(resource.subject),
        perfomer: parse.reference(resource.performer),
    };
}

export type ZibMedicalDeviceRequest = ReturnType<typeof parseZibMedicalDeviceRequest>;

export const zibMedicalDeviceRequest = {
    profile,
    parse: parseZibMedicalDeviceRequest,
    uiSchema,
} satisfies ResourceConfig<DeviceRequest, ZibMedicalDeviceRequest>;
