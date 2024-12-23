import { parse } from '../../../parse';
import { oneOfValueX } from '../../../parse/helpers';
import { type ResourceConfigR3 } from '../config';
import { uiSchema } from './uiSchema';
import { FhirVersion } from '../../../types/Fhir';
import { type DeviceRequest } from 'fhir/r3';
import { type I18nContext } from '../../../i18n';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-MedicalDeviceRequest'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317263
 */
function parseZibMedicalDeviceRequest(resource: DeviceRequest, _i18nContext: I18nContext) {
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
} satisfies ResourceConfigR3<DeviceRequest, ZibMedicalDeviceRequest>;
