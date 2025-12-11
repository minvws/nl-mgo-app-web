import { BackButton } from '$/components/BackButton/BackButton';
import { FormattedMessage, useIntl } from '$/intl';
import { Heading, MarkdownContent } from '@minvws/mgo-ui';
import { unescape } from 'html-escaper';
import { Helmet } from 'react-helmet-async';

export function PrivacyStatement() {
    const { formatMessage } = useIntl();

    return (
        <>
            <Helmet title={formatMessage('privacy.heading')} />

            <section className="grow">
                <BackButton />

                <div className="mx-auto max-w-md pb-12 md:pb-16 lg:pb-24">
                    <Heading as="h1" focusOnRender size="xl" className="mb-4 md:mb-8">
                        <FormattedMessage id="privacy.heading" />
                    </Heading>

                    <MarkdownContent
                        /** Content is sanitized during i18n compilation, see bin/formatter.js */
                        dangerouslySetInnerHTML={{
                            __html: unescape(formatMessage('privacy.markdown')),
                        }}
                    />
                </div>
            </section>
        </>
    );
}
