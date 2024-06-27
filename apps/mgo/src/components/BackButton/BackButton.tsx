import { useNavigate } from '$/routing';
import { Trans } from '@lingui/macro';
import { Button, cn, type ButtonProps } from '@minvws/mgo-mgo-ui';

export function BackButton({ className, ...rest }: ButtonProps) {
    const navigate = useNavigate();

    const buttonProps: ButtonProps = {
        variant: 'ghost',
        leftIcon: 'chevron-left',
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
            <Trans id="common.previous">Vorige</Trans>
        </Button>
    );
}
