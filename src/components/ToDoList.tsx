import InputArea from "../storybook_components/InputArea"
import Tabs from "../storybook_components/Tabs"
import { ReactComponent as Plus } from '../assets/svgs/plus-svgrepo-com.svg'
import { ReactComponent as Untick } from '../assets/svgs/untick-circle-svgrepo-com.svg'
import { ReactComponent as Tick } from '../assets/svgs/tick-circle-svgrepo-com.svg'
import {ReactComponent as Bulb} from '../assets/svgs/bulb-outline-svgrepo-com.svg'
import { useState } from "react"
import List from '../storybook_components/List'
import useLocalStorage from "../hooks/useLocalStorage"
import Button from "../storybook_components/Button"
import Tip from "./Tip"

interface Todo {
    editInterface?: boolean
}

export default function ToDoList({editInterface = false}: Todo) {


    const[icon, setIcon] = useState<boolean>(false);
    const[itemToAdd, setItemToAdd] = useState<string>("");
    const[isActive, setIsActive] = useState<number>(0);
    const[error, setError] = useState(false)

    const[title, setTitle] = useLocalStorage("", "title");
    const[todo, setTodo] = useLocalStorage([], "taskToDo");
    const[completed, setCompleted] = useLocalStorage([], "taskCompleted");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(todo.includes(itemToAdd)) {
            setError(true);
        }
        else {
            setTodo((prev: string[]) => [...prev, itemToAdd]);
            setItemToAdd("");
            setError(false);
        }
    }

    function changeIcon(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(title) {
            setIcon(true);
            setTitle(title)
        };
    }

    function toggleTab(i:number) {
        setIsActive(i);
    }

    function toggleDone(i:number) {
        const todosRemaining = [...todo];
        const todoDone = todosRemaining.splice(i, 1);
        setCompleted((prev: string[]) => [...prev, todoDone[0]]);
        setTodo(todosRemaining);
    }

    function toggleUndone(i:number) {
        const completedRemaining = [...completed];
        const completedUndone = completedRemaining.splice(i, 1);
        setTodo((prev: string[]) => [...prev, completedUndone[0]]);
        setCompleted(completedRemaining);
    }

    return(
        <div className="flex flex-col items-center w-[388px] bg-surface pb-4">
            <div className="border-b border-disabled w-full flex justify-center">
                <Tabs className="m-2" tabs={["Active", "Completed"]} state={isActive} onClick={toggleTab}/>
            </div>
            <InputArea
                className="my-2 pl-2 text-lg"
                label="Set"
                inputType="input"
                svg={icon ? Tick : Untick}
                value={title}
                setValue={e => setTitle(e.target.value)}
                handleSubmit={changeIcon}
                width={"384px"}/>
            {isActive === 0
                ? <>
                    <List
                        className="w-full max-h-64 overflow-y-auto overflow-x-hidden scrollbar"
                        items={todo}
                        setItems={setTodo}
                        onClick={toggleDone}
                        checked={false}
                        readonly={true}
                        editInterface={editInterface}/>
                </>
                : <> 
                    <List
                        className="w-full max-h-64 overflow-y-auto overflow-x-hidden scrollbar"
                        items={completed}
                        setItems={setCompleted}
                        onClick={toggleUndone}
                        checked={true}
                        readonly={true}/>
                    <div className="w-full px-4 pt-4">
                        <Button label="Clear completed" rank="main" onClick={() => setCompleted([])} />
                    </div>
                </>
            }
            {isActive === 0
                ? <>
                    <InputArea
                        className={`bg-surface-container mt-4 ${error ? "mb-2" : ""}`}
                        label="Add"
                        inputType="textarea"
                        svg={Plus}
                        value={itemToAdd}
                        setValue={e => setItemToAdd(e.target.value)}
                        handleSubmit={handleSubmit}
                        width={"384px"}/>
                    {error && <Tip>
                                <Bulb/>
                                <p>This task has already been added!</p>
                            </Tip>
                    }
                </>
                : <></>
            }
        </div>
    )
}