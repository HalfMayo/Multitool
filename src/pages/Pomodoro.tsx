import PageNav from "../components/PageNav";
import PomodoroTimer from "../components/PomodoroTimer";
import QuoteMachine from "../components/QuoteMachine";

export default function Pomodoro() {
    return(
        <>
            <PageNav/>
            <div className="h-screen">
                <div className="pt-72 flex flex-col gap-16 items-center justify-start">
                    <PomodoroTimer />
                    <QuoteMachine />
                </div>
            </div>
        </>
    )
}