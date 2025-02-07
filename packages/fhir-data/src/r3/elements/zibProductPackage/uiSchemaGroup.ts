import { type HealthUiGroupFunction, type NonStrictUi } from '../../../ui/types';
import { map } from '../../../utils';
import { type ZibProductPackage } from './zibProductPackage';

export const uiSchemaGroup: HealthUiGroupFunction<ZibProductPackage> = (resource, context) => {
    const i18n = 'r3.zib_product_package';
    const ui = context.ui as NonStrictUi;

    type ProductContent = NonNullable<ZibProductPackage['content']>[0];

    const contents = map(
        resource.content,
        (content: ProductContent) => {
            return [
                ui.codeableConcept(`${i18n}.content_item`, content.item),
                ui.reference(`${i18n}.content_reference`, content.reference),
            ];
        },
        true
    );

    return {
        label: i18n,
        children: [...contents.flat()],
    };
};
