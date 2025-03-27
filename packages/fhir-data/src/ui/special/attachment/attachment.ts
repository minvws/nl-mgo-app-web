import { type MgoAttachment } from '../../../parse/type/attachment/attachment';
import {
    type DownloadBinary,
    type DownloadLink,
    type UiFunctionWithoutLabel,
    type WithUiHelperContext,
} from '../../types';

export const attachment: WithUiHelperContext<
    UiFunctionWithoutLabel<MgoAttachment, DownloadLink | DownloadBinary>
> =
    ({ formatMessage }) =>
    (value) => {
        const label = value?.title ?? formatMessage('fhir.unknown');
        if (isBinaryReference(value?.url as string)) {
            return {
                type: 'DOWNLOAD_BINARY',
                label,
                reference: value?.url,
            };
        }

        return {
            type: 'DOWNLOAD_LINK',
            label,
            url: value?.url,
        };
    };

function isBinaryReference(value: string) {
    return value?.startsWith('Binary/');
}
