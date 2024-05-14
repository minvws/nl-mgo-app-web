import { Trans } from '@lingui/macro';
import { List, ListIcon, ListItem } from '@minvws/mgo-react-ui';

export const NoSearchResultsTips = () => (
    <List>
        <ListItem className="text-md flex">
            <ListIcon icon="arrow-right-alt" className="fill-dark-blue-700 me-2 h-5 w-5" />
            <span>
                <Trans id="add-healthcare-provider.no-results.usp.1">Controleer de spelling.</Trans>
            </span>
        </ListItem>
        <ListItem className="text-md flex">
            <ListIcon icon="arrow-right-alt" className="fill-dark-blue-700 me-2 h-5 w-5" />
            <span>
                <Trans id="add-healthcare-provider.no-results.usp.2">
                    Vul de juiste naam in. Je vindt deze op de rekening. Of vraag aan de
                    zorgverlener hoe je hun naam schrijft.
                </Trans>
            </span>
        </ListItem>
        <ListItem className="text-md flex">
            <ListIcon icon="arrow-right-alt" className="fill-dark-blue-700 me-2 h-5 w-5" />
            <span>
                <Trans id="add-healthcare-provider.no-results.usp.3">
                    Heeft deze zorgverlener meerdere vestigingen? Vul dan de plaatsnaam van de
                    hoofdvestiging in.
                </Trans>
            </span>
        </ListItem>
    </List>
);
