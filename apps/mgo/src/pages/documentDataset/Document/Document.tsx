import { BackButton } from '$/components/BackButton/BackButton';
import { QueryState } from '$/components/QueryState/QueryState';
import { useNavFocusRef, useOrganization } from '$/hooks/index.ts';
import { NotFound } from '$/pages/NotFound/NotFound';
import { useParams } from '$/routing';
import { getMgoDocument } from '@minvws/mgo-fhir-data';
import { Card, Heading, Link } from '@minvws/mgo-mgo-ui';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';

export function Document() {
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { organization, getDocumentDataset } = useOrganization();
    const { documentId } = useParams();
    const documentDataset = getDocumentDataset();

    const query = useQuery({
        queryKey: ['DocumentReference', organization?.slug, documentId, documentDataset],
        enabled: !!documentDataset,
        queryFn: async () => {
            const documentBundle = await documentDataset!.getDocumentReference(documentId!).json();
            return getMgoDocument(documentBundle);
        },
    });

    return (
        <>
            <Helmet title={query.data?.title} />
            <section className="flex-grow">
                <BackButton />
                {!documentDataset ? (
                    <NotFound />
                ) : (
                    <QueryState
                        {...query}
                        renderResult={({ data }) => (
                            <>
                                <Heading asChild size="lg" className="mb-8">
                                    <h1 ref={navFocusRef}>{data.title}</h1>
                                </Heading>

                                <Card className="mb-6 p-0">
                                    <div className="flex flex-col justify-between gap-1 border-b border-gray-100 p-4 last:border-b-0 dark:border-gray-700">
                                        <div className="text-gray-600 dark:text-gray-400">
                                            Aangemaakt
                                        </div>
                                        <div className="text-md">{data.indexed}</div>
                                    </div>
                                    <div className="flex flex-col justify-between gap-1 border-b border-gray-100 p-4 last:border-b-0 dark:border-gray-700">
                                        <div className="text-gray-600 dark:text-gray-400">
                                            Status
                                        </div>
                                        <div className="text-md">{data.status}</div>
                                    </div>
                                    <div className="flex flex-col justify-between gap-1 border-b border-gray-100 p-4 last:border-b-0 dark:border-gray-700">
                                        <div className="text-gray-600 dark:text-gray-400">
                                            Auteur
                                        </div>
                                        <div className="text-md">{data.author}</div>
                                    </div>
                                    <div className="flex flex-col justify-between gap-1 border-b border-gray-100 p-4 last:border-b-0 dark:border-gray-700">
                                        <div className="text-gray-600 dark:text-gray-400">
                                            Zorgaanbieder
                                        </div>
                                        <div className="text-md">{organization?.name}</div>
                                    </div>
                                </Card>

                                <h2 className="text-md mb-3 font-bold">Opties</h2>

                                <Link href={data.content!.at(0)!.attachment.url} target="_blank">
                                    download
                                </Link>
                            </>
                        )}
                    />
                )}
            </section>
        </>
    );
}
