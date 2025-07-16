import { type UiContext } from '../context';
import { attachment } from './attachment/attachment';
import { oneOfValueX } from './oneOfValueX/oneOfValueX';
import { valueWithMax } from './valueWithMax/valueWithMax';
import { valueWithUnit } from './valueWithUnit/valueWithUnit';

export function getSpecial(context: UiContext) {
    return {
        valueWithMax: valueWithMax(context),
        valueWithUnit: valueWithUnit(context),
        oneOfValueX: oneOfValueX(context),
        attachment: attachment(context),
    };
}
