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
        className="transition ease-in-out flex items-center justify-center h-8 rounded-full shadow-md bg-[#09f] hover:bg-[#09f9] min-w-20">
            {children}
        </button>
    )
}