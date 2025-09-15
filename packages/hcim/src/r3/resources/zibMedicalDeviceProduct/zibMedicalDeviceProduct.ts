import { FhirVersion } from '@minvws/mgo-fhir';
import { type Device } from '@minvws/mgo-fhir/r3';
import { parse } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { map } from '@minvws/mgo-utils';
import { type ResourceConfig } from '../../../resourceTypes.js';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-MedicalDeviceProduct'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317259
 */
function parseZibMedicalDeviceProduct(resource: Device) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier: map(resource.identifier, parse.identifier),
        patient: parse.reference(resource.patient),

        // HCIM LaboratoryTestResult-v4.1(2017EN)
        type: parse.codeableConcept(resource.type),

        // HCIM MedicalDevice-v3.1(2017EN)
        udi: {
            deviceIdentifier: parse.string(resource.udi?.deviceIdentifier),
            carrierHRF: parse.string(resource.udi?.carrierHRF),
        },
        lotNumber: parse.string(resource.lotNumber),
        expirationDate: parse.dateTime(resource.expirationDate),
        note: map(resource.note, parse.annotation),
    };
}

export type ZibMedicalDeviceProduct = ReturnType<typeof parseZibMedicalDeviceProduct>;

export const zibMedicalDeviceProduct = {
    profile,
    parse: parseZibMedicalDeviceProduct,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<FhirVersion.R3, Device, ZibMedicalDeviceProduct>;
