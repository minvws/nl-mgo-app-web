import { type Device } from '../../fhir/index';
import { parse } from '../../parse';
import { type ResourceConfig } from '../config';
import { uiSchema } from './uiSchema';
import { map } from '../../utils';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-MedicalDeviceProduct';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317259
 */
function parseZibMedicalDeviceProduct(resource: Device) {
    return {
        ...parse.resourceMeta(resource, profile),
        note: map(resource.note, parse.annotation),
        patient: parse.reference(resource.patient),
        expirationDate: parse.dateTime(resource.expirationDate),
    };
}

export type ZibMedicalDeviceProduct = ReturnType<typeof parseZibMedicalDeviceProduct>;

export const zibMedicalDeviceProduct = {
    profile,
    parse: parseZibMedicalDeviceProduct,
    uiSchema,
} satisfies ResourceConfig<Device, ZibMedicalDeviceProduct>;
