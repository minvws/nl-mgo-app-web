import womanWithPhoneLight from './illustrations/light/woman-with-phone.svg';
import womanWithPhoneDark from './illustrations/dark/woman-with-phone.svg';
import womanWithPhoneCheckLight from './illustrations/light/woman-with-phone-check.svg';
import womanWithPhoneCheckDark from './illustrations/dark/woman-with-phone-check.svg';
import womanOnCouchLight from './illustrations/light/woman-on-couch.svg';
import womanOnCouchDark from './illustrations/dark/woman-on-couch.svg';
import womanOnCouchSettingsLight from './illustrations/light/woman-on-couch-settings.svg';
import womanOnCouchSettingsDark from './illustrations/dark/woman-on-couch-settings.svg';
import womanOnCouchExclamationLight from './illustrations/light/woman-on-couch-exclamation.svg';
import womanOnCouchExclamationDark from './illustrations/dark/woman-on-couch-exclamation.svg';
import womanWithUmbrellaLight from './illustrations/light/woman-with-umbrella.svg';
import womanWithUmbrellaDark from './illustrations/dark/woman-with-umbrella.svg';

export const illustrations = {
    'woman-with-phone': {
        light: womanWithPhoneLight,
        dark: womanWithPhoneDark,
    },
    'woman-with-phone-check': {
        light: womanWithPhoneCheckLight,
        dark: womanWithPhoneCheckDark,
    },
    'woman-on-couch': {
        light: womanOnCouchLight,
        dark: womanOnCouchDark,
    },
    'woman-on-couch-settings': {
        light: womanOnCouchSettingsLight,
        dark: womanOnCouchSettingsDark,
    },
    'woman-on-couch-exclamation': {
        light: womanOnCouchExclamationLight,
        dark: womanOnCouchExclamationDark,
    },
    'woman-with-umbrella': {
        light: womanWithUmbrellaLight,
        dark: womanWithUmbrellaDark,
    },
};

export type IllustrationName = keyof typeof illustrations;
export const illustrationNames = Object.keys(illustrations) as IllustrationName[];
