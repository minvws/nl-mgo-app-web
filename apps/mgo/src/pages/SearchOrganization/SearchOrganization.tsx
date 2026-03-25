import { Breadcrumbs } from '$/components/Breadcrumbs/Breadcrumbs';
import { LoadingSpinner } from '$/components/LoadingSpinner/LoadingSpinner';
import { useIntl } from '$/intl';
import { Heading, SearchForm } from '@minvws/mgo-ui';
import { Helmet } from 'react-helmet-async';
import { ResultsList } from './ResultsList';
import { StateEmpty } from './StateEmpty';
import { StateIdle } from './StateIdle';
import { useSearchState } from './useSearchState';

export function SearchOrganization() {
    const { formatMessage } = useIntl();
    const heading = formatMessage('add_organization.heading');
    const { searchQuery, handleQueryChange, uiState, searchResults, dataServiceEndpoints } =
        useSearchState();

    return (
        <>
            <Helmet title={heading} />

            <section className="flex grow flex-col">
                <Breadcrumbs className="mb-4 md:mb-6" />

                <Heading as="h1" focusOnRender size="xl" className="mb-4 md:mb-6">
                    {heading}
                </Heading>

                <SearchForm
                    ariaLabel={formatMessage('add_organization.search_aria_label')}
                    clearAriaLabel={formatMessage('add_organization.search_clear')}
                    placeholder={formatMessage('add_organization.search_placeholder')}
                    value={searchQuery}
                    onChange={handleQueryChange}
                    loading={uiState === 'searching'}
                />

                {(uiState === 'loading' || uiState === 'searching') && (
                    <div className="flex grow flex-col items-center justify-center py-8">
                        <LoadingSpinner />
                    </div>
                )}
                {uiState === 'idle' && <StateIdle />}
                {uiState === 'results' && searchResults && (
                    <ResultsList
                        searchResults={searchResults}
                        dataServiceEndpoints={dataServiceEndpoints}
                        className="py-8"
                    />
                )}
                {uiState === 'empty' && <StateEmpty />}
            </section>
        </>
    );
}
