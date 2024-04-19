import { icons } from './Icons';
import { type Status } from './statuses';

export interface AlertProps {
    label: string;
    status: Status;
    description?: string;
}

export const Alert = ({ label, status, description }: AlertProps) => {
    return (
        <div
            role="alert"
            className={`border-grey-100 dark:bg-grey-900 dark:border-grey-500 flex w-full gap-3 rounded-lg border-2 bg-white p-3`}
        >
            <div className={`h-6 w-6`}>{icons[status]}</div>
            <div className={`flex flex-col gap-1`}>
                <span className={`text-base font-bold text-black dark:text-white`}>{label}</span>
                {description ? (
                    <span
                        className={`text-grey-600 dark:text-grey-300 text-base font-normal italic`}
                    >
                        {description}
                    </span>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};
