import { type NonStrictUi, type UiSchemaGroupFunction } from '../../../ui/types';
import { type MgoAttachment } from './attachment';

export const uiSchemaGroup: UiSchemaGroupFunction<MgoAttachment> = (resource, context) => {
    const i18n = 'r3.attachment';
    const ui = context.ui as NonStrictUi;

    return {
        label: i18n,
        children: [
            ui.string(`${i18n}.contentType`, resource.contentType),
            ui.string(`${i18n}.language`, resource.language),
            ui.string(`${i18n}.data`, resource.data),
            ui.string(`${i18n}.url`, resource.url),
            ui.unsignedInt(`${i18n}.size`, resource.size),
            ui.string(`${i18n}.hash`, resource.hash),
            ui.string(`${i18n}.title`, resource.title),
            ui.dateTime(`${i18n}.creation`, resource.creation),
        ],
    };
};
