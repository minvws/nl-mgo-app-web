import { Link } from '$/routing';
import { Trans } from '@lingui/macro';
import { Button, Illustration } from '@minvws/mgo-react-ui';

export const NoHealthcareOrganizations = () => {
    return (
        <>
            <p className="sm:text-md mb-6 text-sm text-gray-700 md:mb-12 md:text-lg lg:text-xl dark:text-white">
                <Trans id="overview.no-results">
                    Je overzicht is nog leeg, omdat je nog geen gegevens hebt opgehaald.
                </Trans>
            </p>
            <Button asChild className="mb-6 self-start md:mb-12">
                <Link to={'/zorgaanbieder-toevoegen'}>Zorgaanbieder toevoegen</Link>
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
