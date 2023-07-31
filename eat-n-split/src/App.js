import { useState } from "react";
import Button from "./components/Button";
import FriendsList from "./components/FriendsList";
import FormAddFriend from "./components/FormAddFriend";
import FormSplitBill from "./components/FormSplitBill";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [chosenFriend, setChosenFriend] = useState(null);

  function handleShowAddFriendForm() {
    setShowAddFriend((showAddFriend) => !showAddFriend);
  }

  //puxa a logica e cria o array de friend no componente pai e passa a logica de adicionar um novo amigo para o componente que ela precisa ser usada
  function handleAddFriend(friend) {
    setFriends((initialFriends) => [...initialFriends, friend]);
    setShowAddFriend(false);
  }

  function handleChoseFriend(friend) {
    setChosenFriend((curChosenFriend) =>
      curChosenFriend?.id === friend.id ? null : friend
    );
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    //percorrer o array inicial de amigos, e ir de amigo por amigo, se o amigo atual foi igual ao amigo selecionado, retorna os dados antigos do amigo com os dados de valor atualizado
    setFriends((initialFriends) =>
      initialFriends.map((friend) =>
        friend.id === chosenFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setChosenFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onChose={handleChoseFriend}
          chosenFriend={chosenFriend}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowAddFriendForm}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {chosenFriend && (
        <FormSplitBill
          chosenFriend={chosenFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}
