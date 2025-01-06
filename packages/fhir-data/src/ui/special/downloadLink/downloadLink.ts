import { type Attachment } from '../../../r3/elements';
import { type DownloadLink, type UiFunctionWithoutLabel, type WithI18nContext } from '../../types';

export const downloadLink: WithI18nContext<UiFunctionWithoutLabel<Attachment, DownloadLink>> =
    (_context) => (value, options) => {
        return {
            type: 'DOWNLOAD_LINK',
            label: value?.title ?? '',
            url: value?.url ?? '',
            ...options,
        } as DownloadLink;
    };
