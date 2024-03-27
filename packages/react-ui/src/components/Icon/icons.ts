/// <reference types="vite-plugin-svgr/client" />
import ChevronLeft from '@material-symbols/svg-400/outlined/chevron_left.svg?react';
import ChevronRight from '@material-symbols/svg-400/outlined/chevron_right.svg?react';
import Encrypted from '@material-symbols/svg-400/outlined/encrypted-fill.svg?react';
import HealthAndSafety from '@material-symbols/svg-400/outlined/health_and_safety-fill.svg?react';
import VerifiedUser from '@material-symbols/svg-400/outlined/verified_user-fill.svg?react';
import GppBad from '@material-symbols/svg-400/outlined/gpp_bad-fill.svg?react';
import ProgressActivity from '@material-symbols/svg-400/outlined/progress_activity.svg?react';
import Person from '@material-symbols/svg-400/outlined/person-fill.svg?react';
import ExpandMore from '@material-symbols/svg-400/outlined/expand_more.svg?react';
import Home from '@material-symbols/svg-400/outlined/home-fill.svg?react';
import Favorite from '@material-symbols/svg-400/outlined/favorite.svg?react';
import QuestionMark from '@material-symbols/svg-400/outlined/question_mark.svg?react';
import Call from '@material-symbols/svg-400/outlined/call.svg?react';
import Delete from '@material-symbols/svg-400/outlined/delete.svg?react';
import Pill from '@material-symbols/svg-400/outlined/pill.svg?react';
import Diagnosis from '@material-symbols/svg-400/outlined/diagnosis.svg?react';
import Description from '@material-symbols/svg-400/outlined/description.svg?react';

import Hospital from './icons/hospital.svg?react';
import Esculaap from './icons/esculaap.svg?react';
import Huisarts from './icons/huisarts.svg?react';
import Tandarts from './icons/tandarts.svg?react';
import GGZ from './icons/ggz.svg?react';

import { type ReactNode } from 'react';

export const icons = {
    ChevronLeft,
    ChevronRight,
    Encrypted,
    HealthAndSafety,
    VerifiedUser,
    GppBad,
    ProgressActivity,
    Person,
    ExpandMore,
    Home,
    Favorite,
    QuestionMark,
    Hospital,
    Esculaap,
    Huisarts,
    Tandarts,
    GGZ,
    Call,
    Delete,
    Pill,
    Diagnosis,
    Description,
};

export type IconName = keyof typeof icons;
export const iconNames = Object.keys(icons) as IconName[];

export const isIconName = (value: string | ReactNode): value is IconName => {
    return typeof value === 'string' && iconNames.includes(value as IconName);
};

export const defaultIconColors: Partial<Record<IconName, string>> = {
    Hospital: 'bg-[#FF0000] text-white',
    Esculaap: 'bg-[#39870C] text-white',
    Huisarts: 'bg-[#007BC7] text-white',
    Tandarts: 'bg-[#8FCAE7] text-white',
    GGZ: 'bg-[#42145F] text-white',
    Call: 'bg-[#007BC7] text-white',
    Delete: 'bg-[#D52B1E] text-white',
    Pill: 'bg-[#EE82EE] text-white',
    Diagnosis: 'bg-[#8FCAE7] text-white',
    Description: 'bg-[#94710A] text-white',
};
export const defaultIconColorIconNames = Object.keys(defaultIconColors) as IconName[];
