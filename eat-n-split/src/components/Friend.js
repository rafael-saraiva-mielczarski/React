import Button from "./Button";

export default function Friend({ friend, onChose, chosenFriend }) {
  const isChosen = chosenFriend?.id === friend.id;

  return (
    <li key={friend.id} className={isChosen ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}R$
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}R$
        </p>
      )}
      <Button onClick={() => onChose(friend)}>
        {isChosen ? "Close" : "Select"}
      </Button>
    </li>
  );
}
