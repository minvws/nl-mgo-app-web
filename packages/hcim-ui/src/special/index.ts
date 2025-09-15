import { type UiContext } from '../context/index.js';
import { attachment } from './attachment/attachment.js';
import { oneOfValueX } from './oneOfValueX/oneOfValueX.js';
import { valueWithMax } from './valueWithMax/valueWithMax.js';
import { valueWithUnit } from './valueWithUnit/valueWithUnit.js';

export function getSpecial(context: UiContext) {
    return {
        valueWithMax: valueWithMax(context),
        valueWithUnit: valueWithUnit(context),
        oneOfValueX: oneOfValueX(context),
        attachment: attachment(context),
    };
}
