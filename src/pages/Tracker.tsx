import BudgetTracker from "../components/BudgetTracker";
import PageBase from "../components/PageBase";

export default function Tracker() {
  return (
    <PageBase type="center">
      <BudgetTracker
        secondLabel="Budget"
        firstLabel="Expenses"
        secondLockable={true}
        min="0"
        max="500"
      />
    </PageBase>
  );
}
