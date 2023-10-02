import PageNav from "../components/PageNav"
import ToDoList from "../components/ToDoList"
import QuoteMachine from "../components/QuoteMachine"

export default function Todo() {
    return(
        <>
            <PageNav />
            <div className="h-screen">
                <div className="pt-72 flex flex-col gap-32 items-center">
                    <div></div>
                    <ToDoList editInterface={true} />
                    <QuoteMachine />
                </div>
            </div>
        </>
    )
}