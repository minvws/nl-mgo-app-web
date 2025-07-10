import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Immunization } from 'fhir/r4';
import { parse } from '../../../parse';
import { filterCodeableConcept, oneOfValueX } from '../../../parse/helpers';
import { type ResourceConfig } from '../../../resourceTypes';
import { generateUiSchema } from '../../../ui/generator';
import { map } from '../../../utils';
import { vaccinationIndicationValueSet } from '../../valueSets/vaccinationIndication';
import { vaccinationMotiveValueSet } from '../../valueSets/vaccinationMotive';
import { ziekteWaarTegenGevaccineerdWordtWaardelijst } from '../../valueSets/ziekteWaarTegenGevaccineerdWordtWaardelijst';
import { summary } from './summary';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/nl-core-Vaccination-event'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.11.0-beta.1/files/2628660
 */
function parseNlCoreVaccinationEvent(resource: Immunization) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R4),

        // zib PharmaceuticalProduct-v2.1.2(2020EN)
        vaccineCode: parse.codeableConcept(resource.vaccineCode),

        // zib Vaccination-v4.0(2020EN)
        ...oneOfValueX(resource, ['dateTime', 'string'], 'occurrence'),
        doseQuantity: parse.quantity(resource.doseQuantity),
        note: map(resource.note, parse.annotation),

        // ART-DECOR Dataset Vaccination-Immunization
        pharmaceuticalProduct: parse.extension(
            resource,
            'http://nictiz.nl/fhir/StructureDefinition/ext-Vaccination.PharmaceuticalProduct', // NOSONAR
            'reference'
        ),
        identifier: map(resource.identifier, parse.identifier),
        status: parse.string(resource.status),
        patient: parse.reference(resource.patient),
        location: parse.reference(resource.location),
        route: parse.codeableConcept(resource.route),
        performer: map(resource.performer, (p) => {
            const administratorFunction = filterCodeableConcept(p.function, {
                system: 'http://terminology.hl7.org/CodeSystem/v2-0443', // NOSONAR
                code: 'AP',
            });

            if (administratorFunction) {
                return {
                    administrator: {
                        actor: parse.reference(p.actor),
                    },
                };
            }

            return undefined;
        }),
        reasonCode: {
            vaccinationIndication: map(
                filterCodeableConcept(resource.reasonCode, vaccinationIndicationValueSet),
                parse.codeableConcept
            ),
            vaccinationMotive: map(
                filterCodeableConcept(resource.reasonCode, vaccinationMotiveValueSet),
                parse.codeableConcept
            ),
        },

        protocolApplied: map(resource.protocolApplied, (protocolApplied) => ({
            targetDisease: {
                targetDisease: map(
                    filterCodeableConcept(
                        protocolApplied?.targetDisease,
                        ziekteWaarTegenGevaccineerdWordtWaardelijst
                    ),
                    parse.codeableConcept
                ),
            },
        })),
    };
}

export type R4NlCoreVaccinationEvent = ReturnType<typeof parseNlCoreVaccinationEvent>;

export const r4NlCoreVaccinationEvent = {
    profile,
    parse: parseNlCoreVaccinationEvent,
    uiSchema: generateUiSchema,
    summary,
} satisfies ResourceConfig<Immunization, R4NlCoreVaccinationEvent>;
