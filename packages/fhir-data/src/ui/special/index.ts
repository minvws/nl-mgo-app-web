import { type UiHelperContext } from '../types';

import { multipleValues } from './multipleValues/multipleValues';
import { valueWithMax } from './valueWithMax/valueWithMax';
import { valueWithUnit } from './valueWithUnit/valueWithUnit';
import { oneOfValueX } from './oneOfValueX/oneOfValueX';
import { downloadLink } from './downloadLink/downloadLink';

export function getSpecial(context: UiHelperContext) {
    return {
        multipleValues: multipleValues(context),
        valueWithMax: valueWithMax(context),
        valueWithUnit: valueWithUnit(context),
        oneOfValueX: oneOfValueX(context),
        downloadLink: downloadLink(context),
    };
}
