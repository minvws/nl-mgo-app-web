import { type HealthUiSchemaFunction } from '../../../ui';
import { map } from '../../../utils';
import { batch } from './elements/batch/batch';
import { ingredient } from './elements/ingredient/ingredient';
import { type R4NlCorePharmaceuticalProduct } from './nlCorePharmaceuticalProduct';

export const i18n = 'r4.zib_pharmaceutical_product';
export const uiSchema: HealthUiSchemaFunction<R4NlCorePharmaceuticalProduct> = (
    resource,
    context
) => {
    const { ui, formatMessage } = context;

    /**
     * https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.8.0-beta.1/files/1946208/~mappings
     */
    const zibPharmaceuticalProduct = {
        MedicationCode: ui.codeableConcept(`${i18n}.code`, resource.code),
        PharmaceuticalForm: ui.codeableConcept(`${i18n}.form`, resource.form),
        Ingredient: map(resource.ingredient, (x) => ingredient.uiSchemaGroup(x, context), true),
    };

    const artDECORDatasetVaccinationImmunization = {
        SerialNumber: ui.identifier(`${i18n}.identifier`, resource.identifier),
        Batch: batch.uiSchemaGroup(resource.batch, context),
        Description: ui.string(`${i18n}.description`, resource.description),
    };

    return {
        label: resource.name?.value ?? formatMessage(i18n),
        children: [
            {
                label: formatMessage(i18n),
                children: [
                    zibPharmaceuticalProduct.MedicationCode,
                    zibPharmaceuticalProduct.PharmaceuticalForm,
                    ...ui.helpers.getChildren(zibPharmaceuticalProduct.Ingredient),
                    artDECORDatasetVaccinationImmunization.SerialNumber,
                    ...ui.helpers.getChildren(artDECORDatasetVaccinationImmunization.Batch),
                    artDECORDatasetVaccinationImmunization.Description,
                ],
            },
        ],
    };
};
