import { ui } from '../../ui';
import { type UiSchemaGroup } from '../../ui/types';
import { map } from '../../utils';
import { type ZibProductPackage } from './zibProductPackage';

export function uiSchemaGroup(resource: ZibProductPackage): UiSchemaGroup {
    const i18n = 'zib_product_package';

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
}
