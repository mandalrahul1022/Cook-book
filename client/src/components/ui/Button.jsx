// Button.jsx
export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`rounded-full px-4 py-1 font-headline shadow-sm hover:brightness-110 transition ${className}`}
    >
      {children}
    </button>
  );
}
