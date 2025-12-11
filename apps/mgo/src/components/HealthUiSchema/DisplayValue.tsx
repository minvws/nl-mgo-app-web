import { useIntl } from '$/intl';
import { usePft } from '$/pft/usePft';
import { DisplayValue as DisplayValueData } from '@minvws/mgo-hcim-ui';
import { ClosableCard, Link, useOpenState } from '@minvws/mgo-ui';
import { HTMLAttributes } from 'react';

export interface DisplayValueProps extends HTMLAttributes<HTMLDivElement> {
    readonly value?: DisplayValueData;
}

export const DisplayValue = ({ value }: DisplayValueProps) => {
    const { isOpen, toggle, close } = useOpenState();
    const { formatMessage } = useIntl();

    const { pft } = usePft(value);
    if (!pft) return <span>{value?.display}</span>;

    return (
        <div className="w-full">
            <Link variant="dotted" asChild iconRight="help">
                <button onClick={toggle}>{value?.display}</button>
            </Link>

            <ClosableCard
                title={formatMessage('patientfriendlyterms.synonym', { synonym: pft.synonym })}
                isOpen={isOpen}
                className="mt-2"
                onClose={close}
                closeButtonAriaLabel={formatMessage('common.voice_over_close')}
            >
                {pft.description}
            </ClosableCard>
        </div>
    );
};
