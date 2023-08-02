import PageNav from "../components/PageNav"
import ToDoList from "../components/ToDoList"
import QuoteMachine from "../components/QuoteMachine"

export default function Todo() {
    return(
        <>
            <PageNav />
            <div className="h-screen">
                <div className="pt-72 flex flex-col gap-16 items-center justify-start">
                    <ToDoList editInterface={true} />
                    <QuoteMachine />
                </div>
            </div>
        </>
    )
}