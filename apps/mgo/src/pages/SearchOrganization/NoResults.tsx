/* c8 ignore start - this is still a work in progress, will be added to coverage later */

import { FormattedMessage } from '$/intl';
import { Heading, Text } from '@minvws/mgo-ui';

export function NoResults() {
    return (
        <div className="flex grow flex-col items-center justify-center py-8">
            <Heading as="h2" size="sm" className="mb-2">
                <FormattedMessage
                    id="organization_search.no_results_found_heading"
                    description="Geen zorgaanbieders gevonden"
                />
            </Heading>
            <Text as="p">
                <FormattedMessage
                    id="organization_search.no_results_found_subheading_2"
                    description="Controleer uw zoekopdracht en probeer het opnieuw."
                />
            </Text>
        </div>
    );
}
