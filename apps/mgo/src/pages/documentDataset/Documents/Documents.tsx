import { BackButton } from '$/components/BackButton/BackButton';
import { QueryState } from '$/components/QueryState/QueryState';
import { useNavFocusRef, useOrganization } from '$/hooks/index.ts';
import { getMgoDocuments } from '@minvws/mgo-fhir-data';
import { Heading } from '@minvws/mgo-mgo-ui';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';
import { DocumentsList } from './DocumentsList';

export function Documents() {
    const intl = useIntl();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { organization, getDocumentDataset } = useOrganization();

    const query = useQuery({
        queryKey: ['DocumentReference', organization?.slug],
        queryFn: async () => {
            const documentDataset = getDocumentDataset();
            if (!documentDataset) {
                return [];
            }

            const documentsBundle = await documentDataset.getDocumentReferences().json();
            return getMgoDocuments(documentsBundle);
        },
    });

    return (
        <>
            <Helmet
                title={intl.formatMessage({ id: 'documents.heading' }) + ` | ${organization?.name}`}
            />
            <section className="flex-grow">
                <BackButton />

                <Heading asChild size="lg">
                    <h1 ref={navFocusRef}>
                        <FormattedMessage id="documents.heading" description="Documenten" />
                    </h1>
                </Heading>

                <div className="py-4 md:py-8">
                    <QueryState
                        {...query}
                        useCardWrapper
                        renderResult={({ data }) => <DocumentsList documents={data} />}
                    />
                </div>
            </section>
        </>
    );
}
