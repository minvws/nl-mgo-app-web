import { type MedicationPackage } from '../../fhir';
import { parse } from '../../parse/type';
import { type Nullable } from '../../types/Nullable';
import { map } from '../../utils';

/**
 * @name HCIM PharmaceuticalProduct
 * @usage zibProduct.package
 * @see https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317343
 */
export function zibProductPackage(value: Nullable<MedicationPackage>) {
    return map(value?.content, ({ itemCodeableConcept, itemReference }) => ({
        item: parse.codeableConcept(itemCodeableConcept),
        reference: parse.reference(itemReference),
    }));
}

export type ZibProductPackage = ReturnType<typeof zibProductPackage>;
