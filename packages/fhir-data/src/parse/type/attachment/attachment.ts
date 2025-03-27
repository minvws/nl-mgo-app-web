import { type Attachment } from '@minvws/mgo-fhir-types';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type ValueType } from '../../types';
import { dateTime, type MgoDateTime } from '../dateTime/dateTime';
import { type MgoUnsignedInt, unsignedInt } from '../unsignedInt/unsignedInt';

export interface MgoAttachment extends ValueType<'Attachment'> {
    contentType: string | undefined;
    language: string | undefined;
    data: string | undefined;
    url: string | undefined;
    size: MgoUnsignedInt | undefined;
    hash: string | undefined;
    title: string | undefined;
    creation: MgoDateTime | undefined;
}

export const attachment = createTypeParser<Attachment, MgoAttachment>((value) => {
    return {
        _type: 'Attachment',
        contentType: value?.contentType,
        language: value?.language,
        data: value?.data,
        url: value?.url,
        size: unsignedInt(value?.size),
        hash: value?.hash,
        title: value?.title,
        creation: dateTime(value?.creation),
    };
});
