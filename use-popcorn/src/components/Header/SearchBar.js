export default function SearchBar({ query, onChange }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={onChange}
    />
  );
}
