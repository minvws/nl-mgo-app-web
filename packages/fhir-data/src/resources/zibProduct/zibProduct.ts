import { zibProductIngredient } from '../../elements/zibProductIngredient/zibProductIngredient';
import { zibProductPackage } from '../../elements/zibProductPackage/zibProductPackage';
import { type Medication } from '../../fhir/index';
import { extensionNictiz } from '../../parse/helpers';
import * as parse from '../../parse/type';
import { map } from '../../utils';
import { parseResourceMeta } from '../resourceMeta/resourceMeta';
import { type ResourceConfig } from '../config';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-Product';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317343
 */
function parseZibProduct(resource: Medication) {
    // const resource = fhirResource as FullFhirResource<ResourceType>;
    return {
        ...parseResourceMeta(resource, profile),
        description: extensionNictiz(resource, 'zib-Product-Description'),
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
