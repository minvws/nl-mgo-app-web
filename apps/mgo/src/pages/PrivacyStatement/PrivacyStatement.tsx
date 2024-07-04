import { BackButton } from '$/components/BackButton/BackButton';
import { Container } from '@minvws/mgo-mgo-ui';
import { useIntl } from 'react-intl';
import { unescape } from 'html-escaper';
import { MarkdownContent } from '../../../../../packages/mgo-ui/src/components/MarkdownContent/MarkdownContent';

export function PrivacyStatement() {
    const intl = useIntl();

    return (
        <>
            <Container>
                <BackButton />
            </Container>

            <Container className="max-w-md pb-12 md:pb-16 lg:pb-24">
                <MarkdownContent
                    /** Content is sanitized during i18n compilation, see bin/formatter.js */
                    dangerouslySetInnerHTML={{
                        __html: unescape(intl.formatMessage({ id: 'privacy.markdown' })),
                    }}
                />
            </Container>
        </>
    );
}
