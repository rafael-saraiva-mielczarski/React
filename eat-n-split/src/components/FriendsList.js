import Friend from "./Friend";

export default function FriendsList({ friends, onChose, chosenFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onChose={onChose}
          chosenFriend={chosenFriend}
        />
      ))}
    </ul>
  );
}
