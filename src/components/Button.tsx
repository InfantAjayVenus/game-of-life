export interface ButtonProps {
    children: React.ReactNode | React.ReactNode[],
    disabled?: boolean,
    onClick?: () => void,
}
export default function Button({ children, disabled=false, onClick=() => {console.log('Stub Clicked')} }: ButtonProps) {
    return (
        <>
            <button
                className={`
                    border border-gray-700 
                    rounded-md 
                    px-12 py-4 
                    mx-2
                    text-center text-xl 
                    ${!disabled ? 'hover:shadow-lg' : ''}
                    ${disabled ? 'text-gray-500' : ''}
                `}
                onClick={onClick}
                disabled={disabled}
            >
                {children}
            </button>
        </>
    )
}