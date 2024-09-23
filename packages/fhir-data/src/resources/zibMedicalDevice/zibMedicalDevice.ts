import { type DeviceUseStatement } from 'fhir/r3';
import { parse } from '../../parse';
import { map } from '../../utils';
import { type ResourceConfig } from '../config';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-MedicalDevice';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317253
 */
function parseZibMedicalDevice(resource: DeviceUseStatement) {
    return {
        ...parse.resourceMeta(resource, profile),
        identifier: map(resource.identifier, parse.identifier),
        organization: parse.extensionNictiz(resource, 'zib-MedicalDevice-Organization'),
        practitioner: parse.extensionNictiz(resource, 'zib-MedicalDevice-Practitioner'),
        reason: parse.extensionNictiz(resource, 'deviceUseStatement-reasonReferenceSTU3'),
        status: parse.code(resource.status),
        patient: parse.reference(resource.subject),
        whenUsed: parse.period(resource.whenUsed),
        // timing
        recordedOn: parse.dateTime(resource.recordedOn),
        source: parse.reference(resource.source),
        device: parse.reference(resource.device),
        // indication
        bodySite: parse.codeableConcept(resource.bodySite),
        laterality: parse.extensionNictiz(resource.bodySite, 'BodySite-Qualifier'),
        note: map(resource.note, parse.annotation),
    };
}

export type ZibMedicalDevice = ReturnType<typeof parseZibMedicalDevice>;

export const zibMedicalDevice = {
    profile,
    parse: parseZibMedicalDevice,
    uiSchema,
} satisfies ResourceConfig<DeviceUseStatement, ZibMedicalDevice>;
