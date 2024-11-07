import { type DeviceRequest } from '../../fhir/index';
import { parse } from '../../parse';
import { oneOfValueX } from '../../parse/helpers';
import { type ResourceConfig } from '../config';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-MedicalDeviceRequest';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317263
 */
function parseZibMedicalDeviceRequest(resource: DeviceRequest) {
    return {
        ...parse.resourceMeta(resource, profile),
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
