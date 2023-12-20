import { useState } from "react";
import { ReactComponent as Go } from "../assets/svgs/right-chevron-svgrepo-com.svg";
import { useFriends } from "../contexts/FriendsContext";
import SvgButton from "../storybook_components/SvgButton";
import CalcBill from "./CalcBill";
import Button from "../storybook_components/Button";

export default function SplitBill() {
  const { friendsList, setFriendsList, selectedFriend, setSelectedFriend } =
    useFriends();
  const [newFriend, setNewFriend] = useState<string>("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (newFriend) {
      const profilePicture = `https://i.pravatar.cc/150?img=${
        Math.random() * (71 - 1) + 1
      }`;
      setFriendsList((prev) => [
        ...prev,
        {
          id: Math.random() * (100001 - 1) + 1,
          name: newFriend,
          remaining: 0,
          avatar: profilePicture,
        },
      ]);
      setNewFriend("");
    }
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-start items-center justify-center gap-4 w-[90vw] sm:w-auto">
      <div>
        <ul
          className={`flex flex-col gap-4 ${
            window.innerHeight < 700 ? "max-h-24" : "max-h-48"
          } sm:max-h-96 overflow-y-auto scrollbar pr-2 w-[90vw] sm:w-[500px]`}
        >
          {friendsList.map((friend) => (
            <li
              className="flex items-center justify-between gap-16 bg-surface-container p-4 rounded-md"
              key={friend.id}
            >
              <div className="flex items-center justify-center gap-4">
                <img
                  className="rounded-full w-14 h-14"
                  src={friend.avatar}
                  alt={`${friend.name}-avatar`}
                />
                <div>
                  <p className="font-semibold text-lg">{friend.name}</p>
                  <p className="text-sm">
                    {typeof friend.remaining === "number" &&
                      (friend.remaining < 0
                        ? `${friend.name} owes you ${Math.abs(
                            friend.remaining
                          )}€`
                        : friend.remaining > 0
                        ? `You owe ${friend.name} ${friend.remaining}€`
                        : `You are even`)}
                  </p>
                </div>
              </div>
              <SvgButton
                svg={Go}
                label="select friend"
                onClick={() =>
                  selectedFriend === friend.id
                    ? setSelectedFriend(null)
                    : setSelectedFriend(friend.id)
                }
              />
            </li>
          ))}
        </ul>
        {!selectedFriend && (
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center w-full mt-8 gap-2"
          >
            <label>
              <input
                className="autofill-w py-1 px-2"
                name="newFriend"
                id="newFriend"
                placeholder="Add a new friend"
                value={newFriend}
                onChange={(e) => setNewFriend(e.target.value)}
              ></input>
            </label>
            <Button type="submit" label="Add" color="primary" rank="main" />
          </form>
        )}
      </div>
      {selectedFriend && <CalcBill key={selectedFriend} />}
    </div>
  );
}
