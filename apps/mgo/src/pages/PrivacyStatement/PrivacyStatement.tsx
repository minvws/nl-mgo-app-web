import { BackButton } from '$/components/BackButton/BackButton';
import { useIntl } from '$/intl';
import { MarkdownContent } from '@minvws/mgo-ui';
import { unescape } from 'html-escaper';

export function PrivacyStatement() {
    const { formatMessage } = useIntl();

    return (
        <section className="flex-grow">
            <BackButton />

            <div className="mx-auto max-w-md pb-12 md:pb-16 lg:pb-24">
                <MarkdownContent
                    /** Content is sanitized during i18n compilation, see bin/formatter.js */
                    dangerouslySetInnerHTML={{
                        __html: unescape(formatMessage('privacy.markdown')),
                    }}
                />
            </div>
        </section>
    );
}
