import { Link } from "react-router-dom";
import { ReactComponent as Knife } from "../assets/svgs/pocket-knife-svgrepo-com.svg";

export default function Logo() {
  return (
    <Link to="/">
      <div className="flex items-center justify-center gap-2">
        <h1 className="text-2xl font-bold hidden sm:block">Multitool</h1>
        <Knife width="40px" height="40px" />
      </div>
    </Link>
  );
}
