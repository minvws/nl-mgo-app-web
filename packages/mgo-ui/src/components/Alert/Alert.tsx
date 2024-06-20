import { icons } from './Icons';
import { type Status } from './statuses';

export interface AlertProps {
    readonly label: string;
    readonly status: Status;
    readonly description?: string;
}

export const Alert = ({ label, status, description }: AlertProps) => {
    return (
        <div
            role="alert"
            className={`flex w-full gap-3 rounded-lg border-2 border-gray-100 bg-white p-3 dark:border-gray-500 dark:bg-gray-900`}
        >
            <div className={`h-6 w-6`}>{icons[status]}</div>
            <div className={`flex flex-col gap-1`}>
                <span className={`text-base font-bold text-black dark:text-white`}>{label}</span>
                {description ? (
                    <span
                        className={`text-base font-normal italic text-gray-600 dark:text-gray-300`}
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
