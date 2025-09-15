import { type MgoCodingProps } from '@minvws/mgo-hcim-parse';
import { isNullish } from '@minvws/mgo-utils';
import { type FormatFunction, type WithUiContext } from '../../types/index.js';

export const systemCode: WithUiContext<FormatFunction<MgoCodingProps>> =
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
