import { type Override } from '$/types/Override';
import { type AppMessagesIds } from '@minvws/mgo-mgo-intl';
import { type ComponentProps } from 'react';
import { FormattedMessage as ReactFormattedMessage } from 'react-intl';

export type RouterNavLinkProps = Override<
    ComponentProps<typeof ReactFormattedMessage>,
    {
        id: AppMessagesIds;
    }
>;

export const FormattedMessage = ReactFormattedMessage;
