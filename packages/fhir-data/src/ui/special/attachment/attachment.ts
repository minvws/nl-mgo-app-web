import { type Attachment } from '../../../r3/elements';
import {
    type DownloadLink,
    type UiFunctionWithoutLabel,
    type WithUiHelperContext,
} from '../../types';

export const attachment: WithUiHelperContext<UiFunctionWithoutLabel<Attachment, DownloadLink>> =
    ({ formatMessage }) =>
    (value) => {
        return {
            type: 'DOWNLOAD_LINK',
            label: value?.title ?? formatMessage('fhir.unknown'),
            url: value?.url,
        } as DownloadLink;
    };
