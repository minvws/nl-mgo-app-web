/* c8 ignore start - This is tested but not registered correctly probably because it's loaded asynchronously */

// NOTE: import order matters!
import 'intl';

import '@formatjs/intl-locale/polyfill';

import '@formatjs/intl-datetimeformat/polyfill';
import '@formatjs/intl-numberformat/polyfill';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-relativetimeformat/polyfill';

import '@formatjs/intl-datetimeformat/add-all-tz';
import '@formatjs/intl-datetimeformat/locale-data/nl';
import '@formatjs/intl-numberformat/locale-data/nl';
import '@formatjs/intl-pluralrules/locale-data/nl';
import '@formatjs/intl-relativetimeformat/locale-data/nl';

/**
 * Set default timezone
 * @see: https://formatjs.github.io/docs/polyfills/intl-datetimeformat/
 */
if ('__setDefaultTimeZone' in Intl.DateTimeFormat) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Intl.DateTimeFormat as any).__setDefaultTimeZone('Europe/Amsterdam');
}
