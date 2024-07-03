export function Button ({
    onClick,
    children,
}: {
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
        onClick={onClick}
        className="transition ease-in-out flex items-center justify-center h-8 rounded-full shadow-md bg-gray-700 hover:bg-gray-900">
            {children}
        </button>
    )
}