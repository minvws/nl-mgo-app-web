import { type ConsentPolicy } from 'fhir/r3';
import { type ResourceElementConfig } from '../../../../elements/config';
import { type Nullable } from '../../../../types/Nullable';
import { uiSchemaGroup } from './uiSchemaGroup';
import { parse } from '../../../../parse';

export interface Policy {
    id: parse.MgoString | undefined;
    authority: parse.MgoString | undefined;
    uri: parse.MgoString | undefined;
}

function parsePolicy(value: Nullable<ConsentPolicy>): Policy {
    return {
        id: parse.string(value?.id),
        authority: parse.string(value?.authority),
        uri: parse.string(value?.uri),
    };
}

export const policy = {
    parse: parsePolicy,
    uiSchemaGroup,
} satisfies ResourceElementConfig<ConsentPolicy, Policy>;
