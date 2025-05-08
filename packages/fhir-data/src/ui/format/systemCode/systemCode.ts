import { isNullish } from '@minvws/mgo-mgo-utils';
import { type MgoCodingProps } from '../../../parse/type/coding/coding';
import { type FormatFunction, type WithUiHelperContext } from '../../types';

export const systemCode: WithUiHelperContext<FormatFunction<MgoCodingProps>> =
    ({ formatMessage, hasMessage }) =>
    (value) => {
        if (isNullish(value)) {
            return;
        }

        const { display, code, system } = value;
        const systemCodeI18n = `system.code.${system}|${code}`;
        const systemCodeString = hasMessage(systemCodeI18n)
            ? formatMessage(systemCodeI18n)
            : display;

        return systemCodeString ?? code;
    };
