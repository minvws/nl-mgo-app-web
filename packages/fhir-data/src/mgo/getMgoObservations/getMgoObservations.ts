/* Deprecated code, no need to test anymore, will be removed soon */
/* c8 ignore start */
import { type LosslessNumber } from '@minvws/mgo-fhir-client';
import type { Bundle, FhirResource, InputFhir, Quantity } from '../../fhir';
import { getBundleResources, getReference, safeGet, safeGetBulk } from '../../utils';

function numberToString(value: number | LosslessNumber | undefined) {
    if (value === undefined) return '-';
    return value.toString();
}

export function quantityToString(quantity: InputFhir<Quantity> | undefined) {
    if (!quantity) return '';
    const { value, unit } = quantity;
    return numberToString(value) + (unit ? ` ${unit}` : '');
}

export function getMgoObservations<T extends FhirResource>(bundle: InputFhir<Bundle<T>>) {
    const observations = getBundleResources(bundle, 'Observation');

    return observations.map((observation) => {
        const specimen = getReference<'Specimen'>(bundle, observation.specimen);

        return {
            ...safeGetBulk(observation, {
                title: ({ category }) => category[0].coding[0].display,
                code: ({ code: { coding } }) => coding[0].display,
                status: ({ status }) => status,
                dateTime: ({ effectiveDateTime }) => effectiveDateTime,
                result: ({ valueQuantity }) => quantityToString(valueQuantity),
                referenceRangeLow: ({ referenceRange: [{ low }] }) => quantityToString(low),
                referenceRangeHigh: ({ referenceRange: [{ high }] }) => quantityToString(high),
                interpretation: ({ interpretation: { coding } }) =>
                    coding.find(({ system }) => system === 'http://snomed.info/sct')?.display,
            }),

            specimen: safeGet(
                specimen,
                ({ type }) => type.coding[0].display,
                observation.specimen?.display
            ),

            collectionDateTime: safeGet(specimen, ({ collection }) => collection.collectedDateTime),
        };
    });
}

export type MgoObservation = ReturnType<typeof getMgoObservations>[number];
