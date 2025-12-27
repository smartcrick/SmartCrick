export default function GoogleButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "white",
        border: "1px solid #ccc",
        padding: "10px 20px",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      Sign in with Google
    </button>
  );
}
