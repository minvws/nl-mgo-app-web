import { FormattedMessage } from '$/intl';
import { Heading, Text } from '@minvws/mgo-ui';

export function DefaultContent() {
    return (
        <div className="flex grow flex-col items-center justify-center py-8">
            <Heading as="h2" size="sm" className="mb-2">
                <FormattedMessage
                    id="add_organization.default_content_heading"
                    description="Waar wilt u uw zorggegevens ophalen?"
                />
            </Heading>
            <Text as="p">
                <FormattedMessage
                    id="add_organization.default_content_subheading"
                    description="Bijvoorbeeld uw huisarts, ziekenhuis of apotheek."
                />
            </Text>
        </div>
    );
}
