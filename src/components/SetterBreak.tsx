import { Dispatch, memo } from "react";
import { ReactComponent as Minus } from "../assets/svgs/minus-svgrepo-com.svg";
import { ReactComponent as Plus } from "../assets/svgs/plus-svgrepo-com.svg";
import SvgButton from "../storybook_components/SvgButton";
import { Actions } from "./PomodoroTimer";

interface BreakProps {
  breakLength: number;
  dispatch: Dispatch<Actions>;
}

export const SetterBreak = memo(function SetterBreak({
  breakLength,
  dispatch,
}: BreakProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-surface-container px-4 pt-4 pb-2 rounded-md w-full sm:w-auto">
      <h3>Break Length</h3>
      <div className="flex items-center justify-center gap-4">
        <SvgButton
          svg={Minus}
          label="decrease break length"
          onClick={() => dispatch({ type: "break/decrement" })}
        />
        <h3>{breakLength}</h3>
        <SvgButton
          svg={Plus}
          label="increase break length"
          onClick={() => dispatch({ type: "break/increment" })}
        />
      </div>
    </div>
  );
});
