import { Trans } from '@lingui/macro';
import NoResultsSvg from './no-search-results.svg?react';
import { List, ListIcon, ListItem } from '@minvws/mgo-react-ui';

export const NoSearchResults = () => (
    <div className="mx-auto my-6 flex max-w-sm flex-grow flex-col items-center justify-center gap-6 md:my-12">
        <NoResultsSvg className="mb-6" />
        <h2 className="text-3xl font-bold">
            <Trans id="add-healthcare-provider.no-results.title">
                Geen zorgverleners gevonden.
            </Trans>
        </h2>
        <List>
            <ListItem className="flex text-lg">
                <ListIcon name="ArrowRightAlt" className="me-2 h-5 w-5 fill-blue-700" />
                <span>
                    <Trans id="add-healthcare-provider.no-results.usp.1">
                        Controleer de spelling.
                    </Trans>
                </span>
            </ListItem>
            <ListItem className="flex text-lg">
                <ListIcon name="ArrowRightAlt" className="me-2 h-5 w-5 fill-blue-700" />
                <span>
                    <Trans id="add-healthcare-provider.no-results.usp.2">
                        Vul de juiste naam in. Je vindt deze op de rekening. Of vraag aan de
                        zorgverlener hoe je hun naam schrijft.
                    </Trans>
                </span>
            </ListItem>
            <ListItem className="flex text-lg">
                <ListIcon name="ArrowRightAlt" className="me-2 h-5 w-5 fill-blue-700" />
                <span>
                    <Trans id="add-healthcare-provider.no-results.usp.3">
                        Heeft deze zorgverlener meerdere vestigingen? Vul dan de plaatsnaam van de
                        hoofdvestiging in.
                    </Trans>
                </span>
            </ListItem>
        </List>
    </div>
);
