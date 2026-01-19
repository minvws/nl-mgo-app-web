import { FormattedMessage } from '$/intl';
import { Button, Heading, Icon, Text } from '@minvws/mgo-ui';
import { onlineManager } from '@tanstack/react-query';
import { type UIEvent } from 'react';

export type ErrorNoDataProps = {
    readonly onClick: (event: UIEvent) => void | Promise<void>;
};

export function ErrorNoData({ onClick }: ErrorNoDataProps) {
    return (
        <div className="w-full py-6 text-center" data-testid={'error-no-data'}>
            <Icon className="mx-auto h-12 w-12" icon={'sync_problem'} />
            <Heading as="h2" size="sm" className="mt-8">
                <FormattedMessage
                    id="health_category.errornodata.heading"
                    description="Geen gegevens opgehaald"
                />
            </Heading>
            <Text className="text-t-label-secondary mt-2" as="p">
                <FormattedMessage
                    id={
                        onlineManager.isOnline()
                            ? 'health_category.errornodata.subheading'
                            : 'errorstate.clientside.heading'
                    }
                    description="Dit komt door een storing bij ons. Probeer het later opnieuw."
                />
            </Text>

            <Button className="mt-6" onClick={onClick}>
                <FormattedMessage id="common.try_again" description="Probeer opnieuw" />
            </Button>
        </div>
    );
}
