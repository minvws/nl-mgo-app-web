import { type Attachment, type DateTimeString } from '@minvws/mgo-fhir-types';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type ValueType } from '../../types';

export interface MgoAttachment extends ValueType<'attachment'> {
    contentType: string | undefined;
    language: string | undefined;
    data: string | undefined;
    url: string | undefined;
    size: number | undefined;
    hash: string | undefined;
    title: string | undefined;
    creation: DateTimeString | undefined;
}

/**
 * @see: https://simplifier.net/packages/hl7.fhir.r3.core/3.0.2/files/62003
 */
export const attachment = createTypeParser<Attachment, MgoAttachment>((value) => {
    return {
        _type: 'attachment',
        contentType: value?.contentType,
        language: value?.language,
        data: value?.data,
        url: value?.url,
        size: value?.size,
        hash: value?.hash,
        title: value?.title,
        creation: value?.creation as DateTimeString,
    };
});
