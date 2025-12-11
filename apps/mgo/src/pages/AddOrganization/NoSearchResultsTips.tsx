import { FormattedMessage } from '$/intl';
import { List, ListIcon, ListItem, Text } from '@minvws/mgo-ui';

export const NoSearchResultsTips = () => (
    <Text asChild>
        <List>
            <ListItem className="flex">
                <ListIcon icon="arrow_right_alt" className="fill-t-cat-rijkslint me-2 h-5 w-5" />
                <span>
                    <FormattedMessage id="organization_search.search_hint_1" />
                </span>
            </ListItem>
            <ListItem className="flex">
                <ListIcon icon="arrow_right_alt" className="fill-t-cat-rijkslint me-2 h-5 w-5" />
                <span>
                    <FormattedMessage id="organization_search.search_hint_2" />
                </span>
            </ListItem>
            <ListItem className="flex">
                <ListIcon icon="arrow_right_alt" className="fill-t-cat-rijkslint me-2 h-5 w-5" />
                <span>
                    <FormattedMessage id="organization_search.search_hint_3" />
                </span>
            </ListItem>
        </List>
    </Text>
);
