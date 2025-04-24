import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Observation } from 'fhir/r3';
import { parse } from '../../../parse';
import { findComponentByCode } from '../../../parse/helpers';
import { type ResourceConfig } from '../../../types';
import { generateUiSchema } from '../../../ui/generator';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-DrugUse'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317175
 */
function parseZibDrugUse(resource: Observation) {
    const {
        comment,
        effectiveDateTime,
        effectivePeriod,
        identifier,
        performer,
        subject,
        valueCodeableConcept,
    } = parseNlCoreObservationBase(resource);

    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier,
        subject,
        effectiveDateTime,
        effectivePeriod,
        performer,

        // HCIM DrugUse-v3.2(2017EN)
        valueCodeableConcept,
        comment,
        drugOrMedicationType: {
            valueCodeableConcept: parse.codeableConcept(
                findComponentByCode(resource.component, '410942007')?.valueCodeableConcept
            ),
        },
        routeOfAdministration: {
            valueCodeableConcept: parse.codeableConcept(
                findComponentByCode(resource.component, '410675002')?.valueCodeableConcept
            ),
        },
        amount: {
            valueString: parse.string(
                findComponentByCode(resource.component, '228390007')?.valueString
            ),
        },
    };
}

export type ZibDrugUse = ReturnType<typeof parseZibDrugUse>;

export const zibDrugUse = {
    profile,
    parse: parseZibDrugUse,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<Observation, ZibDrugUse>;
