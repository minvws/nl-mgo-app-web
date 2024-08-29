import { type MedicationPackage } from '../../fhir';
import * as parse from '../../parse/type';
import { type Nullable } from '../../types/Nullable';
import { map } from '../../utils';
import { type ResourceElementConfig } from '../config';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface ZibProductPackage {
    content:
        | Array<{
              item: parse.MgoCodeableConcept | undefined;
              reference: parse.MgoReference | undefined;
          }>
        | undefined;
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
} satisfies ResourceElementConfig<MedicationPackage, ZibProductPackage>;
