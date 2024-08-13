import type { DomainResource, Element } from '../../../fhir';
import { type KeyXParsedType, type KeyXParsableTypes, valueX } from '../keyX/keyX';

const nictizIdValueXMap = {
    'zib-MedicationUse-AsAgreedIndicator': 'boolean',
    'zib-MedicationUse-Prescriber': 'reference',
    'zib-MedicationUse-Author': 'reference',
    'zib-MedicationUse-ReasonForChangeOrDiscontinuationOfUse': 'codeableConcept',
    'zib-Medication-MedicationTreatment': 'identifier',
    'zib-Medication-RepeatPeriodCyclicalSchedule': 'duration',
    'zib-MedicationUse-Duration': 'duration',
    'zib-Product-Description': 'string',
} satisfies Record<string, KeyXParsableTypes>;

type NictizId = keyof typeof nictizIdValueXMap;

function getExtension(resource: DomainResource | Element | undefined, url: string) {
    return (
        resource?.extension?.find((x) => x.url === url) ||
        (resource as DomainResource | undefined)?.modifierExtension?.find((x) => x.url === url)
    );
}

export function extension<
    T extends DomainResource | Element,
    XType extends KeyXParsableTypes,
    R = KeyXParsedType<XType>,
>(resource: T | undefined, url: string, type: XType): R {
    const extension = getExtension(resource, url);
    return valueX(extension, type) as R;
}

export function extensionNictiz<
    T extends DomainResource | Element,
    Z extends NictizId,
    XType = (typeof nictizIdValueXMap)[Z],
    R = XType extends KeyXParsableTypes ? KeyXParsedType<XType> : never,
>(resource: T | undefined, zibId: Z): R {
    return extension(
        resource,
        `http://nictiz.nl/fhir/StructureDefinition/${zibId}`,
        nictizIdValueXMap[zibId]
    );
}
