import { type ConsentExcept } from 'fhir/r3';
import { type ResourceElementConfigR3 } from '../../../../elements/config';
import { type Nullable } from '../../../../../types/Nullable';
import { map } from '../../../../../utils';
import { uiSchemaGroup } from './uiSchemaGroup';
import { actor, type Actor } from '../actor/actor';
import { data, type Data } from '../data/data';
import { parse } from '../../../../../parse';

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
} satisfies ResourceElementConfigR3<ConsentExcept, Except>;
