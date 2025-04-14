import { type Nullable } from '@minvws/mgo-mgo-utils';
import { type ConsentExcept } from 'fhir/r3';
import { parse } from '../../../../../parse';
import { type ResourceElementConfig } from '../../../../../types';
import { map } from '../../../../../utils';
import { actor, type Actor } from '../actor/actor';
import { data, type Data } from '../data/data';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface Except {
    type: parse.MgoCode | undefined;
    period: parse.MgoPeriod | undefined;
    actor: Actor[] | undefined;
    action: parse.MgoCodeableConcept[] | undefined;
    securityLabel: parse.MgoCoding[] | undefined;
    purpose: parse.MgoCoding[] | undefined;
    class: parse.MgoCoding[] | undefined;
    code: parse.MgoCoding[] | undefined;
    dataPeriod: parse.MgoPeriod | undefined;
    data: Data[] | undefined;
}

function parseExcept(value: Nullable<ConsentExcept>): Except {
    return {
        type: parse.code(value?.type),
        period: parse.period(value?.period),
        actor: map(value?.actor, actor.parse),
        action: map(value?.action, parse.codeableConcept),
        securityLabel: map(value?.securityLabel, parse.coding),
        purpose: map(value?.purpose, parse.coding),
        class: map(value?.class, parse.coding),
        code: map(value?.code, parse.coding),
        dataPeriod: parse.period(value?.dataPeriod),
        data: map(value?.data, data.parse),
    };
}

export const except = {
    parse: parseExcept,
    uiSchemaGroup,
} satisfies ResourceElementConfig<ConsentExcept, Except>;
