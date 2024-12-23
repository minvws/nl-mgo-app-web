import { type I18nContext } from '../../i18n';
import { downloadLink } from './downloadLink/downloadLink';
import { multipleValues } from './multipleValues/multipleValues';
import { oneOfValueX } from './oneOfValueX/oneOfValueX';
import { valueWithMax } from './valueWithMax/valueWithMax';
import { valueWithUnit } from './valueWithUnit/valueWithUnit';

export function getSpecial(context: I18nContext) {
    return {
        multipleValues: multipleValues(context),
        valueWithMax: valueWithMax(context),
        valueWithUnit: valueWithUnit(context),
        oneOfValueX: oneOfValueX(context),
        downloadLink: downloadLink(context),
    };
}
