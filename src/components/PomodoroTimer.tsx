import { useReducer, useEffect, useRef } from "react";
import Tip from "./Tip";
import { Countdown } from "./Countdown";
import { SetterSession } from "./SetterSession";
import { ReactComponent as Bulb } from "../assets/svgs/bulb-outline-svgrepo-com.svg";
import { SetterBreak } from "./SetterBreak";

interface TimerEnd {
  type: "timer/end";
}

interface BreakIncrement {
  type: "break/increment";
}

interface BreakDecrement {
  type: "break/decrement";
}

interface SessionIncrement {
  type: "session/increment";
}

interface SessionDecrement {
  type: "session/decrement";
}

interface DecreaseTime {
  type: "decreaseTime";
}

interface TimerReset {
  type: "timer/reset";
}

interface TimerNext {
  type: "timer/next";
}

interface Pause {
  type: "pause";
}

export type Actions =
  | TimerEnd
  | BreakIncrement
  | BreakDecrement
  | SessionIncrement
  | SessionDecrement
  | DecreaseTime
  | TimerNext
  | TimerReset
  | Pause;

interface PomodoroProps {
  breakLength: number;
  sessionLength: number;
  sessionTimer: boolean;
  counter: number;
  pause: boolean;
  nextTimer: boolean;
}

const initialState = {
  breakLength: 5,
  sessionLength: 25,
  sessionTimer: true,
  counter: 25 * 60000,
  pause: true,
  nextTimer: false,
};

function reducer(state: PomodoroProps, action: Actions) {
  switch (action.type) {
    case "timer/end":
      return { ...state, pause: true, nextTimer: true };
    case "break/increment":
      if (state.pause && state.breakLength < 60)
        return { ...state, breakLength: state.breakLength + 1 };
      else return { ...state };
    case "break/decrement":
      if (state.pause && state.breakLength > 1)
        return { ...state, breakLength: state.breakLength - 1 };
      else return { ...state };
    case "session/increment":
      if (state.pause && state.sessionLength < 60)
        return {
          ...state,
          sessionLength: state.sessionLength + 1,
          counter:
            state.counter +
            (60000 - Math.floor((state.sessionLength + 1) / 1000) * 1000),
        };
      else return { ...state };
    case "session/decrement":
      if (state.pause && state.sessionLength > 1)
        return {
          ...state,
          sessionLength: state.sessionLength - 1,
          counter:
            state.counter -
            (60000 - Math.floor((state.sessionLength - 1) / 1000) * 1000),
        };
      else return { ...state };
    case "decreaseTime":
      return { ...state, counter: state.counter - 1000 };
    case "pause":
      return { ...state, pause: state.pause ? false : true };
    case "timer/reset":
      return initialState;
    case "timer/next":
      return {
        ...state,
        pause: false,
        nextTimer: false,
        counter: state.sessionTimer
          ? state.counter + state.breakLength * 60000
          : state.counter + state.sessionLength * 60000,
        sessionTimer: state.sessionTimer ? false : true,
      };
    default:
      throw new Error("Wtf?!");
  }
}

function PomodoroTimer() {
  const [
    { breakLength, sessionLength, sessionTimer, counter, pause, nextTimer },
    dispatch,
  ] = useReducer(reducer, initialState);

  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const audioRef = useRef<HTMLAudioElement>(null);

  let seconds: number | string = Math.floor(counter / 1000);
  let minutes: number | string = Math.floor(seconds / 60);

  minutes = minutes !== 60 ? (minutes % 60).toString().padStart(2, "0") : 60;
  seconds = (seconds % 60).toString().padStart(2, "0");

  useEffect(() => {
    if (Number(minutes) + Number(seconds) < 1) {
      if (audioRef.current) audioRef.current.play();
      clearInterval(intervalRef.current);
      dispatch({ type: "timer/end" });
    }
  }, [counter, minutes, seconds]);

  function handlePlayPause() {
    if (!nextTimer) {
      if (!pause) {
        clearInterval(intervalRef.current);
      } else {
        intervalRef.current = setInterval(
          () => dispatch({ type: "decreaseTime" }),
          1000
        );
      }
      dispatch({ type: "pause" });
    } else {
      handleNextTimer();
    }
  }

  function handleReset() {
    clearInterval(intervalRef.current);
    dispatch({ type: "timer/reset" });
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }

  function handleNextTimer() {
    dispatch({ type: "timer/next" });
    intervalRef.current = setInterval(
      () => dispatch({ type: "decreaseTime" }),
      1000
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-[80vw] sm:w-fit">
      <div className="flex sm:flex-row flex-col items-center justify-center sm:gap-8 gap-4 w-full">
        <SetterSession sessionLength={sessionLength} dispatch={dispatch} />
        <SetterBreak breakLength={breakLength} dispatch={dispatch} />
      </div>
      <Countdown
        sessionTimer={sessionTimer}
        handleReset={handleReset}
        handlePlayPause={handlePlayPause}
        minutes={minutes}
        seconds={seconds}
        pause={pause}
        audioRef={audioRef}
      />
      {nextTimer ? (
        <Tip>
          <Bulb />
          <p>
            To start the next {sessionTimer ? "break" : "session"}, click the
            Play button.
          </p>
        </Tip>
      ) : (
        <></>
      )}
    </div>
  );
}

export default PomodoroTimer;
