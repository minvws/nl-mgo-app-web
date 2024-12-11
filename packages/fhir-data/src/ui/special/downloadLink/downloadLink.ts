import { type MgoAttachment } from '../../../r3/elements';
import { type WithUiContext, type DownloadLink, type UiFunctionWithoutLabel } from '../../types';

export const downloadLink: WithUiContext<UiFunctionWithoutLabel<MgoAttachment, DownloadLink>> =
    (_context) => (value, options) => {
        return {
            type: 'DOWNLOAD_LINK',
            label: value?.title ?? '',
            url: value?.url ?? '',
            ...options,
        } as DownloadLink;
    };
