import AccountBalance from '@material-symbols/svg-400/outlined/account_balance.svg?react';
import Allergy from '@material-symbols/svg-400/outlined/allergy.svg?react';
import ArrowRightAlt from '@material-symbols/svg-400/outlined/arrow_right_alt.svg?react';
import AttachFile from '@material-symbols/svg-400/outlined/attach_file.svg?react';
import Autorenew from '@material-symbols/svg-400/outlined/autorenew.svg?react';
import CalendarToday from '@material-symbols/svg-400/outlined/calendar_today.svg?react';
import Call from '@material-symbols/svg-400/outlined/call.svg?react';
import CancelFill from '@material-symbols/svg-400/outlined/cancel-fill.svg?react';
import Cancel from '@material-symbols/svg-400/outlined/cancel.svg?react';
import Check from '@material-symbols/svg-400/outlined/check.svg?react';
import Delete from '@material-symbols/svg-400/outlined/delete.svg?react';
import Description from '@material-symbols/svg-400/outlined/description.svg?react';
import Diagnosis from '@material-symbols/svg-400/outlined/diagnosis.svg?react';
import Download from '@material-symbols/svg-400/outlined/download.svg?react';
import EmergencyHome from '@material-symbols/svg-400/outlined/emergency_home.svg?react';
import Encrypted from '@material-symbols/svg-400/outlined/encrypted-fill.svg?react';
import EventNote from '@material-symbols/svg-400/outlined/event_note.svg?react';
import Folder from '@material-symbols/svg-400/outlined/folder.svg?react';
import GppBad from '@material-symbols/svg-400/outlined/gpp_bad-fill.svg?react';
import Group from '@material-symbols/svg-400/outlined/group.svg?react';
import HealthAndSafety from '@material-symbols/svg-400/outlined/health_and_safety-fill.svg?react';
import HealthCross from '@material-symbols/svg-400/outlined/health_cross.svg?react';
import Labs from '@material-symbols/svg-400/outlined/labs.svg?react';
import LinkOff from '@material-symbols/svg-400/outlined/link_off.svg?react';
import MedicalInformation from '@material-symbols/svg-400/outlined/medical_information.svg?react';
import MedicalServices from '@material-symbols/svg-400/outlined/medical_services.svg?react';
import Menu from '@material-symbols/svg-400/outlined/menu.svg?react';
import Nutrition from '@material-symbols/svg-400/outlined/nutrition.svg?react';
import PatientList from '@material-symbols/svg-400/outlined/patient_list.svg?react';
import Person from '@material-symbols/svg-400/outlined/person.svg?react';
import PictureAsPdf from '@material-symbols/svg-400/outlined/picture_as_pdf.svg?react';
import Pill from '@material-symbols/svg-400/outlined/pill.svg?react';
import ProgressActivity from '@material-symbols/svg-400/outlined/progress_activity.svg?react';
import Psychology from '@material-symbols/svg-400/outlined/psychology.svg?react';
import SentimentSatisfied from '@material-symbols/svg-400/outlined/sentiment_satisfied.svg?react';
import Stethoscope from '@material-symbols/svg-400/outlined/stethoscope.svg?react';
import Syringe from '@material-symbols/svg-400/outlined/syringe.svg?react';
import VerifiedUser from '@material-symbols/svg-400/outlined/verified_user-fill.svg?react';
import VitalSigns from '@material-symbols/svg-400/outlined/vital_signs.svg?react';
import Warning from '@material-symbols/svg-400/outlined/warning-fill.svg?react';

import Add from '@material-symbols/svg-400/rounded/add.svg?react';
import ChevronLeft from '@material-symbols/svg-400/rounded/chevron_left.svg?react';
import ChevronRight from '@material-symbols/svg-400/rounded/chevron_right.svg?react';
import Help from '@material-symbols/svg-700/rounded/help.svg?react';

import Home from '@material-symbols/svg-400/rounded/home.svg?react';
import Settings from '@material-symbols/svg-400/rounded/settings.svg?react';
import Close from '@material-symbols/svg-700/rounded/close.svg?react';
import Favorite from '@material-symbols/svg-700/rounded/favorite.svg?react';

import CheckFill from '@material-symbols/svg-400/outlined/check_circle-fill.svg?react';
import InfoFill from '@material-symbols/svg-400/outlined/info-fill.svg?react';
import FavoriteFill from '@material-symbols/svg-400/rounded/favorite-fill.svg?react';
import HelpFilled from '@material-symbols/svg-700/rounded/help-fill.svg?react';
import HomeFill from '@material-symbols/svg-400/rounded/home-fill.svg?react';
import SettingsFill from '@material-symbols/svg-400/rounded/settings-fill.svg?react';

export const icons = {
    chevron_left: ChevronLeft,
    chevron_right: ChevronRight,
    encrypted: Encrypted,
    health_and_safety: HealthAndSafety,
    verified_user: VerifiedUser,
    gpp_bad: GppBad,
    group: Group,
    progress_activity: ProgressActivity,
    person: Person,
    favorite: Favorite,
    call: Call,
    delete: Delete,
    pill: Pill,
    diagnosis: Diagnosis,
    description: Description,
    cancel: Cancel,
    'cancel-fill': CancelFill,
    add: Add,
    warning: Warning,
    arrow_right_alt: ArrowRightAlt,
    autorenew: Autorenew,
    check: Check,
    folder: Folder,
    download: Download,
    labs: Labs,
    event_note: EventNote,
    nutrition: Nutrition,
    emergency_home: EmergencyHome,
    stethoscope: Stethoscope,
    syringe: Syringe,
    vital_signs: VitalSigns,
    allergy: Allergy,
    medical_services: MedicalServices,
    sentiment_satisfied: SentimentSatisfied,
    menu: Menu,
    close: Close,
    help: Help,
    home: Home,
    settings: Settings,
    'check-fill': CheckFill,
    'help-fill': HelpFilled,
    'home-fill': HomeFill,
    'favorite-fill': FavoriteFill,
    'settings-fill': SettingsFill,
    'info-fill': InfoFill,
    attach_file: AttachFile,
    picture_as_pdf: PictureAsPdf,
    psychology: Psychology,
    health_cross: HealthCross,
    calendar_today: CalendarToday,
    patient_list: PatientList,
    account_balance: AccountBalance,
    link_off: LinkOff,
    medical_information: MedicalInformation,
};

export type IconName = keyof typeof icons;
export const iconNames = Object.keys(icons).sort((a, b) => a.localeCompare(b)) as IconName[];

export const iconPaddings: Partial<Record<IconName, string>> = {
    download: 'p-[2px]',
};
