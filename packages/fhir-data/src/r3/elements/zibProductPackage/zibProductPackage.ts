import { type MedicationPackage } from 'fhir/r3';
import { parse } from '../../../parse';
import { type Nullable } from '../../../types/Nullable';
import { map } from '../../../utils';
import { type ResourceElementConfigR3 } from '../config';
import { uiSchemaGroup } from './uiSchemaGroup';

interface ZibProductPackageContent {
    item: parse.MgoCodeableConcept | undefined;
    reference: parse.MgoReference | undefined;
}

export interface ZibProductPackage {
    content: ZibProductPackageContent[] | undefined;
}

/**
 * @name HCIM PharmaceuticalProduct
 * @usage zibProduct.package
 * @see https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317343
 */
function parseZibProductPackage(value: Nullable<MedicationPackage>) {
    return {
        content: map(value?.content, ({ itemCodeableConcept, itemReference }) => ({
            item: parse.codeableConcept(itemCodeableConcept),
            reference: parse.reference(itemReference),
        })),
    };
}

export const zibProductPackage = {
    parse: parseZibProductPackage,
    uiSchemaGroup,
} satisfies ResourceElementConfigR3<MedicationPackage, ZibProductPackage>;
