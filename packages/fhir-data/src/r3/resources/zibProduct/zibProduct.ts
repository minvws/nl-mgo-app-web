import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Medication } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types';
import { map } from '../../../utils';
import { zibProductIngredient } from '../../elements/zibProductIngredient/zibProductIngredient';
import { zibProductPackage } from '../../elements/zibProductPackage/zibProductPackage';
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
} satisfies ResourceConfig<Medication, ZibProduct>;
