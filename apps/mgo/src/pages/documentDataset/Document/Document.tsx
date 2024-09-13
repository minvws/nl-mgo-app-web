import { BackButton } from '$/components/BackButton/BackButton';
import { QueryState } from '$/components/QueryState/QueryState';
import { useNavFocusRef, useOrganization } from '$/hooks/index.ts';
import { NotFound } from '$/pages/NotFound/NotFound';
import { RouterLink, useParams } from '$/routing';
import { getMgoDocument } from '@minvws/mgo-fhir-data';
import { DescriptionButton, DescriptionCard, DescriptionList, Heading } from '@minvws/mgo-mgo-ui';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';

export function Document() {
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { organization, getDocumentsService } = useOrganization();
    const { documentId } = useParams();
    const documentsService = getDocumentsService();

    const query = useQuery({
        queryKey: ['DocumentReference', organization?.slug, documentId, documentsService],
        enabled: !!documentsService,
        queryFn: async () => {
            const documentBundle = await documentsService!.getDocumentReference(documentId!).json();
            return getMgoDocument(documentBundle);
        },
    });

    return (
        <>
            <Helmet title={query.data?.title} />
            <section className="flex-grow">
                <BackButton />
                {!documentsService ? (
                    <NotFound />
                ) : (
                    <QueryState
                        {...query}
                        renderResult={({ data }) => (
                            <>
                                <Heading asChild size="lg" className="mb-8">
                                    <h1 ref={navFocusRef}>{data.title}</h1>
                                </Heading>

                                <DescriptionList className="mb-6">
                                    <DescriptionCard term="Aangemaakt" details={data.indexed} />
                                    <DescriptionCard term="Status" details={data.status} />
                                    <DescriptionCard term="Auteur" details={data.author} />
                                    <DescriptionButton
                                        term="Zorgaanbieder"
                                        details={organization?.name}
                                        icon="chevron-right"
                                        asChild
                                    >
                                        <RouterLink to={`/overzicht/${organization?.slug}`} />
                                    </DescriptionButton>
                                </DescriptionList>

                                <h2 className="text-md mb-3 font-bold">Opties</h2>
                                <DescriptionList className="mb-12">
                                    {data.content?.map(({ attachment }) => (
                                        <DescriptionButton
                                            details={`Download ${attachment.title}`}
                                            icon="download"
                                            asChild
                                            key={attachment.title}
                                        >
                                            <a
                                                href={attachment.url}
                                                target="_blank"
                                                rel="noreferrer"
                                            />
                                        </DescriptionButton>
                                    ))}
                                </DescriptionList>
                            </>
                        )}
                    />
                )}
            </section>
        </>
    );
}
