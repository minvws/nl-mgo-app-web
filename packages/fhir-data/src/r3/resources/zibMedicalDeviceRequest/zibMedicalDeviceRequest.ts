import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type DeviceRequest } from 'fhir/r3';
import { parse } from '../../../parse';
import { oneOfValueX } from '../../../parse/helpers';
import { type ResourceConfig } from '../../../resourceTypes';
import { generateUiSchema } from '../../../ui/generator';
import { map } from '../../../utils';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-MedicalDeviceRequest'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317263
 */
function parseZibMedicalDeviceRequest(resource: DeviceRequest) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier: map(resource.identifier, parse.identifier),
        subject: parse.reference(resource.subject),
        ...oneOfValueX(resource, ['period', 'dateTime', 'timing'], 'occurrence'),
        requester: parse.reference(resource.requester?.agent),

        // HCIM MedicalDevice-v3.1(2017EN)
        ...oneOfValueX(resource, ['reference', 'codeableConcept'], 'code'),

        // HCIM PlannedCareActivityForTransfer-v3.1(2017EN)
        status: {
            orderStatus: parse.extension(
                resource._status,
                'http://nictiz.nl/fhir/StructureDefinition/code-specification', // NOSONAR
                'codeableConcept'
            ),
        },

        // HCIM HealthProfessional-v3.2(2017EN)
        performerType: {
            healthProfessionalRole: map(resource.performerType?.coding, parse.coding),
        },
    };
}

export type ZibMedicalDeviceRequest = ReturnType<typeof parseZibMedicalDeviceRequest>;

export const zibMedicalDeviceRequest = {
    profile,
    parse: parseZibMedicalDeviceRequest,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<DeviceRequest, ZibMedicalDeviceRequest>;
