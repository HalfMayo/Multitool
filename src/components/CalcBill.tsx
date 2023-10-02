import { useState } from "react"
import { Friend } from "../interfaces/Friends"
import Button from "../storybook_components/Button"
import { useFriends } from "../contexts/FriendsContext";
import Tip from "./Tip";
import {ReactComponent as Hand} from '../assets/svgs/hand-holding-svgrepo-com.svg'
import {ReactComponent as Piggie} from '../assets/svgs/money-manager-svgrepo-com.svg'
import {ReactComponent as Bulb} from '../assets/svgs/bulb-outline-svgrepo-com.svg'


export default function CalcBill() {

    const{friendsList, setFriendsList, selectedFriend, setSelectedFriend} = useFriends();

    const [total, setTotal] = useState<string>("");
    const [youPaid, setYouPaid] = useState<string>("");
    const [otherPaid, setOtherPaid] = useState<string>("");
    const [payer, setPayer] = useState<string>("");
    const [calc, setCalc] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    function getFriend() : Friend|undefined {
        const [friend] = friendsList.filter(friend => friend.id === selectedFriend);
        return friend;
    }

    const myFriend = getFriend();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if(parseFloat(youPaid) > parseFloat(total)) {
            setError(true);
            return
        }

        const eventSubmitter = (e.nativeEvent as SubmitEvent).submitter?.getAttribute('value');

        if(eventSubmitter === "Calculate") {
            if(total && youPaid && payer !== "") {
                const parsedTotal = parseFloat(total);
                const parsedPaid = parseFloat(youPaid);
                const parsedOther = parsedTotal - parsedPaid;
                setOtherPaid(parsedOther.toString())
                const newData = friendsList.map(friend => {
                    if(friend.id === selectedFriend) {
                        return {...friend, remaining: friend.remaining + (payer === myFriend?.name ? parsedPaid : -parsedOther)}
                    }
                    return friend;
                })
                setError(false);
                setFriendsList(newData);
                setCalc(true);
            }
        } else if (eventSubmitter === "New Bill") {
            setError(false);
            setCalc(false);
            setTotal("");
            setOtherPaid("");
            setYouPaid("");
            setPayer("");
        }
    }

    return(
        <>
            <form className="w-[500px] flex flex-col items-start justify-center gap-4 bg-surface-container p-4 rounded-md" onSubmit={handleSubmit}>
                <div className="w-full">
                    <label className="block mb-1" htmlFor="payer">Who paid the bill?</label>
                        <select className="w-full p-1" name="payer" id="payer" value={payer} onChange={e => setPayer(e.target.value)}>
                            <option value="default">Choose...</option>
                            <option value="you">You</option>
                            <option value={myFriend?.name}>{myFriend?.name}</option>
                        </select>
                </div>
                <div className="w-full autofill-w">
                    <label htmlFor="total" className="block mb-1">Total amount of the bill</label>
                    <input className="w-full py-1 px-2" name="total" id="total" value={total} onChange={(e) => setTotal(e.target.value)}></input>    
                </div>            
                <div className="w-full autofill-w">
                    <label htmlFor="youPaid" className="block mb-1">What's your share?</label>
                    <input className="w-full py-1 px-2" name="youPaid" id="youPaid" value={youPaid} onChange={(e) => setYouPaid(e.target.value)}></input>
                </div>
                <div className="w-full flex flex-col items-center justify-center py-2 gap-2">
                {error && 
                            <Tip>
                                <Bulb width="24px" height="24px"/>
                                <p>Individual amounts can't be higher than the bill!</p>
                            </Tip>
                }
                {calc && (payer === myFriend?.name
                            ? <Tip>
                                <Hand width="24px" height="24px"/>
                                <p>For this bill, you owe {myFriend?.name} {youPaid}€</p>
                                </Tip>
                            : payer === "you"
                                ? <Tip>
                                    <Hand width="24px" height="24px"/>
                                    <p>For this bill, {myFriend?.name} owes you {otherPaid}€</p>
                                </Tip>
                                : <></>)
                }
                {calc && (typeof myFriend?.remaining === "number" && (myFriend?.remaining < 0
                        ? <Tip>
                            <Piggie width="24px" height="24px"/>
                            <p>Overall, {myFriend?.name} still owes you {Math.abs(myFriend?.remaining)}€</p>
                        </Tip>
                        : myFriend?.remaining > 0
                            ? <Tip>
                                <Piggie width="24px" height="24px"/>
                                <p>Overall, you still owe {myFriend?.name} {myFriend?.remaining}€</p>
                            </Tip>
                            : <Tip>
                                <Piggie width="24px" height="24px"/>
                                <p>Overall, you are even</p>
                            </Tip>
                      )
                    )
                }
                </div>
                <div className="flex items-center justify-between w-full">
                    <Button label="Back" onClick={()=>setSelectedFriend(null)}/>
                    {!calc
                        ? <Button label="Calculate" type="submit" color="primary" rank="main"/>
                        : <Button label="New Bill" type="submit" color="primary" rank="main"/>
                    }
                </div>
            </form>
        </>
    )
}