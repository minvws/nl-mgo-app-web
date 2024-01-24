import { ReactElement } from 'react';
import {ReactComponent as Success} from '../../Assets/Icons/success.svg';
import {ReactComponent as Info} from '../../Assets/Icons/info.svg';
import {ReactComponent as Warning} from '../../Assets/Icons/warning.svg';

export enum AlertStatus {
    SUCCESS = 'success',
    WARNING = 'warning',
    INFO = 'info'
}

export interface AlertProps {
    label: string;
    status: AlertStatus,
    description?: string;
}

/**
 * Primary UI component for user interaction
 */
export const Alert = ({ label, status, description }: AlertProps) => {
    return (
        <div role="alert" className={`flex w-full bg-white border-[#E3E3E3] border-2 p-3 gap-3 rounded-lg`}>
            <div className={`w-6 h-6`}>{getStatusIcon(status)}</div>
            <div className={`flex flex-col gap-1`}>
                <span className={`text-base font-bold text-black`}>{ label }</span>
                {description ? (
                    <span className={`text-base italic font-normal text-[#535353]`}>{ description }</span>  
                ): ''}
            </div>
        </div>
    );
};

function getStatusIcon(status: AlertStatus): ReactElement|null {
    switch (status) {
        case AlertStatus.SUCCESS:
            return <Success />;
        case AlertStatus.WARNING:
            return <Warning />;
        case AlertStatus.INFO:
            return <Info />;
        default:
            return null;
    }
}