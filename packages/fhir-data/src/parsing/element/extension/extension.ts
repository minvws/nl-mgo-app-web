import type { DomainResource, Element } from '../../../fhir';
import { type ValueXConvertedType, valueX, type ValueX } from '../../helpers/valueX/valueX';

const nictizIdValueXMap = {
    'zib-MedicationUse-AsAgreedIndicator': 'valueBoolean',
    'zib-MedicationUse-Prescriber': 'valueReference',
    'zib-MedicationUse-Author': 'valueReference',
    'zib-MedicationUse-ReasonForChangeOrDiscontinuationOfUse': 'valueCodeableConcept',
    'zib-Medication-MedicationTreatment': 'valueIdentifier',
    'zib-Medication-RepeatPeriodCyclicalSchedule': 'valueDuration',
    'zib-MedicationUse-Duration': 'valueDuration',
    'zib-Product-Description': 'valueString',
} satisfies Record<string, ValueX>;

type NictizId = keyof typeof nictizIdValueXMap;

function getExtension(resource: DomainResource | Element | undefined, url: string) {
    return (
        resource?.extension?.find((x) => x.url === url) ||
        (resource as DomainResource | undefined)?.modifierExtension?.find((x) => x.url === url)
    );
}

export function extension<
    T extends DomainResource | Element,
    XType extends ValueX,
    R = ValueXConvertedType<XType>,
>(resource: T, url: string, type: XType): R {
    const extension = getExtension(resource, url);
    return valueX(type, extension) as R;
}

export function extensionNictiz<
    T extends DomainResource | Element,
    Z extends NictizId,
    XType = (typeof nictizIdValueXMap)[Z],
    R = XType extends ValueX ? ValueXConvertedType<XType> : never,
>(resource: T | undefined, zibId: Z): R {
    const extension = getExtension(resource, `http://nictiz.nl/fhir/StructureDefinition/${zibId}`);
    return valueX(nictizIdValueXMap[zibId], extension) as R;
}
