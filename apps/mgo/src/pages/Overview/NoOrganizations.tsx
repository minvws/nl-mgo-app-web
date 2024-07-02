import { RouterLink } from '$/routing';
import { Button, Illustration } from '@minvws/mgo-mgo-ui';
import { FormattedMessage } from 'react-intl';

export const NoOrganizations = () => {
    return (
        <>
            <p className="sm:text-md mb-6 text-sm text-gray-700 md:mb-12 md:text-lg lg:text-xl dark:text-white">
                <FormattedMessage
                    id="overview.no_organizations_found"
                    description="Je overzicht is nog leeg, omdat je nog geen gegevens hebt opgehaald."
                />
            </p>
            <Button asChild className="mb-6 self-start md:mb-12">
                <RouterLink to="/zorgaanbieder-toevoegen">
                    <FormattedMessage
                        id="overview.add_organization"
                        description="Voeg een zorgaanbieder toe"
                    />
                </RouterLink>
            </Button>
            <div className="flex flex-grow flex-col items-center">
                <Illustration
                    illustration="woman-on-couch"
                    className="mx-auto w-full max-w-[230px] md:max-w-[438px]"
                />
            </div>
        </>
    );
};
