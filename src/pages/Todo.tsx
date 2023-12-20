import PageBase from "../components/PageBase";
import ToDoList from "../components/ToDoList";

export default function Todo() {
  return (
    <PageBase type="top">
      <ToDoList editInterface={true} />
    </PageBase>
  );
}
