import { type Attachment as FhirAttachment } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceElementConfig } from '../../../types/Fhir';
import { type Nullable } from '../../../types/Nullable';
import { uiSchemaGroup } from './uiSchemaGroup';

export type Attachment = {
    contentType: parse.MgoString | undefined;
    language: parse.MgoString | undefined;
    data: parse.MgoString | undefined;
    url: parse.MgoString | undefined;
    size: parse.MgoUnsignedInt | undefined;
    hash: parse.MgoString | undefined;
    title: parse.MgoString | undefined;
    creation: parse.MgoDateTime | undefined;
};

/**
 * @see https://simplifier.net/packages/hl7.fhir.r3.core/3.0.2/files/62003
 */
function parseAttachment(value: Nullable<FhirAttachment>): Attachment {
    return {
        contentType: parse.code(value?.contentType),
        language: parse.code(value?.language),
        data: parse.string(value?.data),
        url: parse.string(value?.url),
        size: parse.unsignedInt(value?.size),
        hash: parse.string(value?.hash),
        title: parse.string(value?.title),
        creation: parse.dateTime(value?.creation),
    };
}

export const attachment = {
    parse: parseAttachment,
    uiSchemaGroup,
} satisfies ResourceElementConfig<FhirAttachment, Attachment>;
