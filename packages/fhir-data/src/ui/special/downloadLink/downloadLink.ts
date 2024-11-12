import { type MgoAttachment } from '../../../r3/elements';
import { type Lossless } from '../../../types/Lossless';
import { type DownloadLink, type UiEntryOptions } from '../../types';

export function downloadLink(
    value: Lossless<MgoAttachment>,
    options?: UiEntryOptions
): DownloadLink {
    return {
        type: 'DOWNLOAD_LINK',
        label: value.title ?? '',
        url: value.url ?? '',
        ...options,
    };
}
