import { useState, useContext, createContext, Dispatch, SetStateAction, ReactNode } from "react";
import { Friend } from "../interfaces/Friends";
import useLocalStorage from "../hooks/useLocalStorage";


interface BillContextProps {
    friendsList: Friend[],
    setFriendsList: Dispatch<SetStateAction<Friend[]>>,
    selectedFriend: number | null,
    setSelectedFriend: Dispatch<SetStateAction<number|null>>,
}

interface BillProviderProps {
    children: ReactNode
}

const FriendsContext = createContext<BillContextProps | undefined>(undefined);

function FriendsProvider({children}: BillProviderProps) {
    const [friendsList, setFriendsList] = useLocalStorage([], "friends");
    const [selectedFriend, setSelectedFriend] = useState<number|null>(null)

    return(
        <FriendsContext.Provider value={{friendsList, setFriendsList, selectedFriend, setSelectedFriend}}>
            {children}
        </FriendsContext.Provider>
    )
}

function useFriends() {
    const context = useContext(FriendsContext);
    if(context === undefined) throw new Error("FriendsContext was used outside FriendsProvider :(");
    return context;
}

export {FriendsProvider, useFriends}