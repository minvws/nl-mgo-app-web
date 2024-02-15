/// <reference types="vite-plugin-svgr/client" />
import ChevronLeft from '@material-symbols/svg-400/outlined/chevron_left.svg?react';
import ChevronRight from '@material-symbols/svg-400/outlined/chevron_right.svg?react';
import Encrypted from '@material-symbols/svg-400/outlined/encrypted-fill.svg?react';
import HealthAndSafety from '@material-symbols/svg-400/outlined/health_and_safety-fill.svg?react';
import VerifiedUser from '@material-symbols/svg-400/outlined/verified_user-fill.svg?react';
import GppBad from '@material-symbols/svg-400/outlined/gpp_bad-fill.svg?react';

import { type ReactNode } from 'react';

export const icons = {
    ChevronLeft,
    ChevronRight,
    Encrypted,
    HealthAndSafety,
    VerifiedUser,
    GppBad,
};

export type IconName = keyof typeof icons;
export const iconNames = Object.keys(icons) as IconName[];

export const isIconName = (value: string | ReactNode): value is IconName => {
    return typeof value === 'string' && iconNames.includes(value as IconName);
};
