import ArrowRightAlt from '@material-symbols/svg-400/outlined/arrow_right_alt.svg?react';
import Autorenew from '@material-symbols/svg-400/outlined/autorenew.svg?react';
import Call from '@material-symbols/svg-400/outlined/call.svg?react';
import Cancel from '@material-symbols/svg-400/outlined/cancel-fill.svg?react';
import ChevronLeft from '@material-symbols/svg-400/outlined/chevron_left.svg?react';
import ChevronRight from '@material-symbols/svg-400/outlined/chevron_right.svg?react';
import Delete from '@material-symbols/svg-400/outlined/delete.svg?react';
import Description from '@material-symbols/svg-400/outlined/description.svg?react';
import Diagnosis from '@material-symbols/svg-400/outlined/diagnosis.svg?react';
import Encrypted from '@material-symbols/svg-400/outlined/encrypted-fill.svg?react';
import KeyboardArrowDown from '@material-symbols/svg-400/outlined/keyboard_arrow_down.svg?react';
import Favorite from '@material-symbols/svg-400/outlined/favorite.svg?react';
import GppBad from '@material-symbols/svg-400/outlined/gpp_bad-fill.svg?react';
import HealthAndSafety from '@material-symbols/svg-400/outlined/health_and_safety-fill.svg?react';
import Person from '@material-symbols/svg-400/outlined/person.svg?react';
import Pill from '@material-symbols/svg-400/outlined/pill.svg?react';
import ProgressActivity from '@material-symbols/svg-400/outlined/progress_activity.svg?react';
import VerifiedUser from '@material-symbols/svg-400/outlined/verified_user-fill.svg?react';
import Warning from '@material-symbols/svg-400/outlined/warning-fill.svg?react';
import Check from '@material-symbols/svg-400/outlined/check.svg?react';
import Folder from '@material-symbols/svg-400/outlined/folder.svg?react';
import Download from '@material-symbols/svg-400/outlined/download.svg?react';
import Labs from '@material-symbols/svg-400/outlined/labs.svg?react';
import EventNote from '@material-symbols/svg-400/outlined/event_note.svg?react';
import Stethoscope from '@material-symbols/svg-400/outlined/stethoscope.svg?react';
import Nutrition from '@material-symbols/svg-400/outlined/nutrition.svg?react';
import EmergencyHome from '@material-symbols/svg-400/outlined/emergency_home.svg?react';
import Syringe from '@material-symbols/svg-400/outlined/syringe.svg?react';
import DateRange from '@material-symbols/svg-400/outlined/date_range.svg?react';
import VitalSigns from '@material-symbols/svg-400/outlined/vital_signs.svg?react';
import Allergy from '@material-symbols/svg-400/outlined/allergy.svg?react';
import MoreHoriz from '@material-symbols/svg-400/outlined/more_horiz.svg?react';

import Add from './icons/add.svg?react';
import ChevronRightFat from './icons/chevron-right-fat.svg?react';
import Esculaap from './icons/esculaap.svg?react';
import GGZ from './icons/ggz.svg?react';
import Hospital from './icons/hospital.svg?react';
import Huisarts from './icons/huisarts.svg?react';
import Tandarts from './icons/tandarts.svg?react';
import Home from './icons/home.svg?react';
import QuestionMark from './icons/question_mark.svg?react';
import Close from './icons/close.svg?react';
import Spinner from './icons/spinner.svg?react';


export const icons = {
    hospital: Hospital,
    esculaap: Esculaap,
    'general-practitioner': Huisarts,
    dentist: Tandarts,
    ggz: GGZ,
    home: Home,
    'question-mark': QuestionMark,
    'chevron-right-fat': ChevronRightFat,
    close: Close,
    spinner: Spinner,

    'chevron-left': ChevronLeft,
    'chevron-right': ChevronRight,
    encrypted: Encrypted,
    'health-and-safety': HealthAndSafety,
    'verified-user': VerifiedUser,
    'gpp-bad': GppBad,
    'progress-activity': ProgressActivity,
    person: Person,
    'keyboard-arrow-down': KeyboardArrowDown,
    favorite: Favorite,
    call: Call,
    delete: Delete,
    pill: Pill,
    diagnosis: Diagnosis,
    description: Description,
    cancel: Cancel,
    add: Add,
    warning: Warning,
    'arrow-right-alt': ArrowRightAlt,
    autorenew: Autorenew,
    check: Check,
    folder: Folder,
    download: Download,
    labs: Labs,
    'event-note': EventNote,
    nutrition: Nutrition,
    'emergency-home': EmergencyHome,
    stethoscope: Stethoscope,
    syringe: Syringe,
    'date-range': DateRange,
    'vital-signs': VitalSigns,
    allergy: Allergy,
    'more-horiz': MoreHoriz,
};

export type IconName = keyof typeof icons;
export const iconNames = Object.keys(icons) as IconName[];

export const iconPaddings: Partial<Record<IconName, string>> = {
    home: 'p-[2px]',
    'question-mark': 'pl-[2px] py-[2px]',
    download: 'p-[2px]',
    spinner: 'p-[4px]',
};

export const iconColours: Partial<Record<IconName, string>> = {
    hospital: 'bg-[#FF0000] text-white',
    esculaap: 'bg-[#39870C] text-white',
    'general-practitioner': 'bg-[#007BC7] text-white',
    dentist: 'bg-[#8FCAE7] text-white',
    ggz: 'bg-[#42145F] text-white',
    home: 'bg-[#01689B] text-white',
    favorite: 'bg-[#D52B1E] text-white',
    'question-mark': 'bg-[#8FCAE7] text-white',
    call: 'bg-[#007BC7] text-white',
    delete: 'bg-[#D52B1E] text-white',
    pill: 'bg-[#EE82EE] text-white',
    diagnosis: 'bg-[#8FCAE7] text-white',
    description: 'bg-[#94710A] text-white',
};
