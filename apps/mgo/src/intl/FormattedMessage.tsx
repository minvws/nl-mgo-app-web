import { type AppMessagesIds } from '@minvws/mgo-mgo-intl';
import { type ComponentProps, type FC } from 'react';
import { FormattedMessage as ReactFormattedMessage } from 'react-intl';
import { type OverrideProperties } from 'type-fest';

export type FormattedMessageProps = OverrideProperties<
    ComponentProps<typeof ReactFormattedMessage>,
    {
        id: AppMessagesIds;
    }
>;

export const FormattedMessage = ReactFormattedMessage as FC<FormattedMessageProps>;
