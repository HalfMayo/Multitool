import BudgetTracker from "../components/BudgetTracker";
import PageNav from "../components/PageNav";
import QuoteMachine from "../components/QuoteMachine";

export default function Tracker() {
    
    return(
        <>
            <PageNav/>
            <div className="h-screen">
                <div className="pt-72 flex flex-col gap-16 items-center justify-start">
                    <BudgetTracker secondLabel="Budget" firstLabel="Expenses" secondLockable={true} min="0" max="500"/>
                    <QuoteMachine />
                </div>
            </div>
        </>
    )
}