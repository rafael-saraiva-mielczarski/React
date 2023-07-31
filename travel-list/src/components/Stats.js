export default function Stats({ items }) {
  if (items.length === 0)
    return (
      <p className="stats">
        <em>Start adding some items to your Packing List 🚀</em>
      </p>
    );

  const listItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((packedItems / listItems) * 100);

  return (
    <footer className="stats">
      {percentage !== 100 ? (
        <em>
          💼 You have {listItems} items on your list, and you already packed{" "}
          {packedItems}({percentage}%)
        </em>
      ) : (
        <em>You got everything packed! Ready to go ✈️</em>
      )}
    </footer>
  );
}
