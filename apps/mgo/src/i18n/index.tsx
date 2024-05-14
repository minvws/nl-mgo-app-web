import { i18n } from '@lingui/core';
import { I18nProvider as LinguiI18nProvider } from '@lingui/react';
import { type ReactNode } from 'react';
import { messages } from './locales/nl.po';

const DEFAULT_LOCALE = 'nl';

i18n.load(DEFAULT_LOCALE, messages);
i18n.activate(DEFAULT_LOCALE);

interface I18nProviderProps {
    children: ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => (
    <LinguiI18nProvider i18n={i18n}>{children}</LinguiI18nProvider>
);
