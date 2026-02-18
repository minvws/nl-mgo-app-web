import { type MgoAttachment } from '@minvws/mgo-hcim-parse';
import {
    type DownloadBinary,
    type DownloadLink,
    type UiFunctionWithoutLabel,
    type WithUiContext,
} from '../../types/index.js';

export const attachment: WithUiContext<
    UiFunctionWithoutLabel<MgoAttachment, DownloadLink | DownloadBinary>
> =
    ({ formatMessage }) =>
    (value) => {
        const label = value?.title ?? formatMessage('fhir.unknown');
        if (isBinaryReference(value?.url as string)) {
            return {
                id: label,
                type: 'DOWNLOAD_BINARY',
                label,
                reference: value?.url,
            };
        }

        return {
            id: label,
            type: 'DOWNLOAD_LINK',
            label,
            url: value?.url,
        };
    };

function isBinaryReference(value: string) {
    return value?.startsWith('Binary/');
}
