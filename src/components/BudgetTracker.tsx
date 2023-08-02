import { useMemo } from "react";
import Slider from "../storybook_components/Slider";
import useLocalStorage from "../hooks/useLocalStorage";

interface BudgetTracker {
    secondLockable?: boolean;
    secondLabel: string;
    firstLockable?: boolean;
    firstLabel: string;
    min: string;
    max: string;
}

export default function BudgetTracker({secondLabel, firstLabel, max, min, firstLockable = false, secondLockable = false} : BudgetTracker) {

    const[expenses, setExpenses] = useLocalStorage("250", "expenses");
    const[budget, setBudget] = useLocalStorage("250", "budget");

    const calcBudget = useMemo(() => {
        return parseInt(budget) - parseInt(expenses);
      }, [budget, expenses])

    return(
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-start justify-center">
                <Slider label={firstLabel} max={max} min={min} value={expenses} onChange={e => setExpenses(e.target.value)} lockable={firstLockable}/>
                <Slider label={secondLabel} max={max} min={min} value={budget} onChange={e => setBudget(e.target.value)} lockable={secondLockable}/>
            </div>
      <p>Your remaining budget is: {calcBudget}</p>
    </div>
    )
}