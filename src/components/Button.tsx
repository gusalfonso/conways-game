import "../styles/Button.css"; // Asegúrate de que este archivo exista

export function Button({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button onClick={onClick} className="custom-button">
      {children}
    </button>
  );
}
