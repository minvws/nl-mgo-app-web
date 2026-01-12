import { FormattedMessage } from '$/intl';
import { Button, Heading, Icon, Text } from '@minvws/mgo-ui';
import { ButtonLoadingProps } from '@minvws/mgo-ui/components/Button/Button.js';
import { AllOrNone } from '@minvws/mgo-utils';

export type ErrorNoDataProps = {
    readonly onClick: (event: UIEvent) => void | Promise<void>;
} & AllOrNone<ButtonLoadingProps>;

export function ErrorNoData({ onClick }: ErrorNoDataProps) {
    return (
        <div className="w-full py-6 text-center">
            <Icon className="mx-auto h-12 w-12" icon={'sync_problem'} />
            <Heading as="h2" size="sm" className="mt-8">
                <FormattedMessage
                    id="health_category.errornodata.heading"
                    description="Geen gegevens opgehaald"
                />
            </Heading>
            <Text className="text-t-label-secondary mt-2" as="p">
                <FormattedMessage
                    id="health_category.errornodata.subheading"
                    description="Dit komt door een storing bij ons. Probeer het later opnieuw."
                />
            </Text>

            <Button className="mt-6" onClick={onClick}>
                <FormattedMessage id="common.try_again" description="Probeer opnieuw" />
            </Button>
        </div>
    );
}
