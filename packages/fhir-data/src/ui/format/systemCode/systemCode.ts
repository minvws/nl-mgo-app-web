import { type MgoCoding } from '../../../parse/type';
import { type FormatFunction, type WithUiHelperContext } from '../../types';

export const systemCode: WithUiHelperContext<FormatFunction<MgoCoding>> =
    ({ formatMessage, hasMessage }) =>
    (value) => {
        const { display, code, system } = value ?? {};

        const systemCodeI18n = `system.code.${system}|${code}`;
        const systemCodeString = hasMessage(systemCodeI18n)
            ? formatMessage(systemCodeI18n)
            : display;

        return systemCodeString ?? code;
    };
