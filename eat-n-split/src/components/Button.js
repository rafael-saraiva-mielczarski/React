//unico componente reusavel, por isso o children e onclick como props dele
export default function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
