import PageNav from "../components/PageNav";
import SplitBill from "../components/SplitBill";
import QuoteMachine from "../components/QuoteMachine";
import { FriendsProvider } from "../contexts/FriendsContext";

export default function Splitter() {
    return(
        <>
            <PageNav />
            <div className="h-screen">
                <div className="pt-72 flex flex-col gap-16 items-center justify-start">
                    <FriendsProvider>
                        <SplitBill />
                    </FriendsProvider>
                    <QuoteMachine />
                </div>
            </div>
        </>
    )
}