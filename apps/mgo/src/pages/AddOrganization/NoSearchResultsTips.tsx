import { FormattedMessage } from '$/intl';
import { List, ListIcon, ListItem } from '@minvws/mgo-mgo-ui';

export const NoSearchResultsTips = () => (
    <List>
        <ListItem className="text-md flex">
            <ListIcon icon="arrow-right-alt" className="fill-dark-blue-700 me-2 h-5 w-5" />
            <span>
                <FormattedMessage id="organization_search.search_hint_1" />
            </span>
        </ListItem>
        <ListItem className="text-md flex">
            <ListIcon icon="arrow-right-alt" className="fill-dark-blue-700 me-2 h-5 w-5" />
            <span>
                <FormattedMessage id="organization_search.search_hint_2" />
            </span>
        </ListItem>
        <ListItem className="text-md flex">
            <ListIcon icon="arrow-right-alt" className="fill-dark-blue-700 me-2 h-5 w-5" />
            <span>
                <FormattedMessage id="organization_search.search_hint_3" />
            </span>
        </ListItem>
    </List>
);
