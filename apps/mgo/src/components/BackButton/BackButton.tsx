import { FormattedMessage } from '$/intl';
import { useNavigate } from '$/routing';
import { Button, cn, type ButtonProps } from '@minvws/mgo-ui';

export function BackButton({ className, ...rest }: Readonly<ButtonProps>) {
    const navigate = useNavigate();

    const buttonProps: ButtonProps = {
        variant: 'ghost',
        leftIcon: 'chevron_left',
        className: 'my-3 pl-0',
        ...rest,
    };

    const { idx } = window.history.state ?? {};

    return (
        <Button
            onClick={() => navigate(-1)}
            {...buttonProps}
            className={cn(buttonProps.className, className, {
                invisible: idx === 0 || idx === undefined,
            })}
        >
            <FormattedMessage id="common.previous" description="Vorige" />
        </Button>
    );
}
