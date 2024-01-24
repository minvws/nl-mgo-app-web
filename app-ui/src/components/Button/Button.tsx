export enum ButtonType {
    SOLID = 'solid',
    LIGHT = 'light',
    OUTLINE = 'outline'
}

export interface ButtonProps {
    label: string;
    type?: ButtonType;
    disabled?: boolean;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ label, type = ButtonType.SOLID, disabled = false }: ButtonProps) => {
    return (
        <button
            type="button"
            className={`block w-full py-4 px-6 text-base font-bold text-center rounded-lg border-2 outline-none ${getTypeColors(type)} disabled:bg-[#CCCCCC] disabled:border-[#CCCCCC]`}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

function getTypeColors(type: ButtonType): string {
    switch (type) {
        case ButtonType.SOLID:
            return 'bg-[#007BC7] text-white border-[#007BC7] hover:bg-[#01689B] hover:border-[#01689B] focus:border-4 focus:border-[#B2D7EE]';
        case ButtonType.LIGHT:
            return 'bg-[#D9EBF7] text-[#01689B] border-[#D9EBF7] hover:bg-[#8FCAE7] hover:border-[#8FCAE7] focus:border-4 focus:border-[#EEF7FB]';
        case ButtonType.OUTLINE:
            return 'bg-white text-[#01689B] border-[#CCCCCC] hover:bg-[#007BC7] hover:border-[#007BC7] hover:text-white focus:border-4 focus:border-[#007BC7]';
        default:
            return ''
    }
}