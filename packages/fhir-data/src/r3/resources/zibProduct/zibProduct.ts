import { zibProductIngredient } from '../../elements/zibProductIngredient/zibProductIngredient';
import { zibProductPackage } from '../../elements/zibProductPackage/zibProductPackage';
import { type Medication } from 'fhir/r3';
import { FhirVersion } from '../../../types/Fhir';
import { parse } from '../../../parse';
import { map } from '../../../utils';
import { type ResourceConfigR3 } from '../config';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-Product'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317343
 */
function parseZibProduct(resource: Medication) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        description: parse.extensionNictiz(resource, 'zib-Product-Description'),
        code: parse.codeableConcept(resource.code),
        form: parse.codeableConcept(resource.form),
        ingredient: map(resource.ingredient, zibProductIngredient.parse),
        package: zibProductPackage.parse(resource.package),
    };
}

export type ZibProduct = ReturnType<typeof parseZibProduct>;

export const zibProduct = {
    profile,
    parse: parseZibProduct,
    uiSchema,
} satisfies ResourceConfigR3<Medication, ZibProduct>;
