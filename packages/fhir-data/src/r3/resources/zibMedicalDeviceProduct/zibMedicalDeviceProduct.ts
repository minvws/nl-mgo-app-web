import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Device } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types/Fhir';
import { map } from '../../../utils';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-MedicalDeviceProduct'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317259
 */
function parseZibMedicalDeviceProduct(resource: Device) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
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
