import { Link } from "react-router-dom";
import SvgButton from "../storybook_components/SvgButton";
import Tooltip from "../storybook_components/Tooltip";
import { ReactComponent as List } from "../assets/svgs/list-svgrepo-com.svg";
import { ReactComponent as Split } from "../assets/svgs/euro-svgrepo-com.svg";
import { ReactComponent as Cal } from "../assets/svgs/calculator-svgrepo-com.svg";
import { ReactComponent as Pom } from "../assets/svgs/stopwatch-svgrepo-com.svg";
import { ReactComponent as Track } from "../assets/svgs/wallet-svgrepo-com.svg";

export default function HomeNavbar() {
  return (
    <div className="flex gap-4 items-center justify-center">
      <Link to="/todo">
        <Tooltip title="ToDo List" side="bottom">
          <SvgButton
            className="drop-shadow-md bg-white hover:bg-secondary-container hover:text-on-secondary-container hover:drop-shadow-md"
            svg={List}
            label="open to-do list"
          />
        </Tooltip>
      </Link>
      <Link to="/splitter">
        <Tooltip title="Bill Splitter" side="bottom">
          <SvgButton
            className="drop-shadow-md bg-white hover:bg-secondary-container hover:text-on-secondary-container hover:drop-shadow-md"
            svg={Split}
            label="open to-do list"
          />
        </Tooltip>
      </Link>
      <Link to="/calc">
        <Tooltip title="Calculator" side="bottom">
          <SvgButton
            className="drop-shadow-md bg-white hover:bg-secondary-container hover:text-on-secondary-container hover:drop-shadow-md"
            svg={Cal}
            label="open to-do list"
          />
        </Tooltip>
      </Link>
      <Link to="/pomodoro">
        <Tooltip title="Pomodoro Timer" side="bottom">
          <SvgButton
            className="drop-shadow-md bg-white hover:bg-secondary-container hover:text-on-secondary-container hover:drop-shadow-md"
            svg={Pom}
            label="open to-do list"
          />
        </Tooltip>
      </Link>
      <Link to="/tracker">
        <Tooltip title="Budget Tracker" side="bottom">
          <SvgButton
            className="drop-shadow-md bg-white hover:bg-secondary-container hover:text-on-secondary-container hover:drop-shadow-md"
            svg={Track}
            label="open to-do list"
          />
        </Tooltip>
      </Link>
    </div>
  );
}
