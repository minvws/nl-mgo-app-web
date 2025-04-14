import { type Nullable } from '@minvws/mgo-mgo-utils';
import { type EpisodeOfCareStatusHistory } from 'fhir/r3';
import { parse } from '../../../../../parse';
import { type ResourceElementConfig } from '../../../../../types';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface StatusHistory {
    status: parse.MgoCode | undefined;
    period: parse.MgoPeriod | undefined;
}

function parseStatusHistory(value: Nullable<EpisodeOfCareStatusHistory>): StatusHistory {
    return {
        status: parse.code(value?.status),
        period: parse.period(value?.period),
    };
}

export const statusHistory = {
    parse: parseStatusHistory,
    uiSchemaGroup,
} satisfies ResourceElementConfig<EpisodeOfCareStatusHistory, StatusHistory>;
